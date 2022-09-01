import base64
from pprint import pprint
import sqlite3
import requests
from bs4 import BeautifulSoup

# database connection
con = None

def create_connection(db_file_path):
    try:
        con = sqlite3.connect(db_file_path)
    except Error as e:
        print(e)
    return con


def scrape_github_repos(url):
    pageNum = 1
    username = "prydonius"
    url = f"https://github.com/{username}?tab=repositories&page="
    repositories = get_repositories(url + str(pageNum))
    while(len(repositories) > 0):
        for repo in repositories:
            name = repo.find("a", {"itemprop": "name codeRepository"})
            language = repo.find("span", {"itemprop": "programmingLanguage"})
            description = repo.find("p", {"itemprop": "description"})
            date = repo.find("relative-time")
            stars = repo.select_one("a[href*=stargazers]")
            forks = repo.select_one("a[href*=members]")
            data = (username, 
                    name.text.strip(), 
                    description.text.strip() if description is not None else "", 
                    date.text.strip(), 
                    language.text.strip() if language is not None else "", 
                    forks.text.strip() if forks is not None else "", 
                    stars.text.strip() if stars is not None else "")
            print(data)
            insert_repo(data)
        pageNum += 1
        repositories = get_repositories(url + str(pageNum))
        
def get_repositories(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id='user-repositories-list')
    repositories = results.find_all("li", class_="public")
    return repositories

def insert_repo(repo):
    print(repo)
    cur = con.cursor()
    cur.execute("""INSERT INTO repository(username, repository_name, description, last_update, language, forks, stars) 
                    VALUES(?,?,?,?,?,?,?)""", repo)
    con.commit()
    return cur.lastrowid

def create_table():
    sql = """
    CREATE TABLE IF NOT EXISTS repository (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      repository_name TEXT,
      last_update TEXT,
      language TEXT,
      forks INT,
      stars INT,
      description TEXT
      )"""
    cur = con.cursor()
    cur.execute(sql)
    con.commit()


def main():
    db_path = "../db/github.db"
    global con
    con = create_connection(db_path)
    with con:
        # create 'Repository' table if not exist
        create_table()
        # run scrape function
        scrape_github_repos("")


if __name__ == '__main__':
    main()
