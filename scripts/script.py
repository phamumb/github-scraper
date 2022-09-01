import base64
from github import Github
from pprint import pprint
import sqlite3
import requests
from bs4 import BeautifulSoup

# Github username
username = "x4nth055"
con = None
# database connection
def create_connection(db_file_path):
    try:
        con = sqlite3.connect(db_file_path)
    except Error as e:
        print(e)
    return con

def scrape_website(url):
    url = "https://github.com/phamumb?tab=repositories&page=1"
    page = requests.get(url);

    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id='user-repositories-list')
    repositories = results.find_all("li", class_="public");
    for repo in repositories:
        name = repo.find("a", {"itemprop" : "name codeRepository"})
        language = repo.find("span", {"itemprop" : "programmingLanguage"})
        description = repo.find("p", {"itemprop" : "description"})
        date = repo.find("relative-time")
        stars = repo.select_one("a[href*=stargazers]")
        forks = repo.select_one("a[href*=members]")
        print(name.text.strip())
        print(description.text.strip() if description is not None else "")
        print(language.text.strip() if language is not None else "")
        print(date.text.strip())
        print('stars', stars.text.strip() if stars is not None else "")
        print('forks', forks.text.strip() if forks is not None else "")
        print("--------------------")
    

def insert_repo(repo):
    data = (username, repo.full_name, repo.created_at, repo.pushed_at, repo.homepage, repo.language, repo.forks, repo.stargazers_count);
    cur = con.cursor()
    cur.execute("""INSERT INTO repository(username, repository_name, created_at, pushed_at, home_page, language, forks, stars) 
                    VALUES(?,?,?,?,?,?,?,?)""", data)
    con.commit()
    return cur.lastrowid

def select_from():
    sql = """select * from repository"""
    cur = con.cursor()
    res = cur.execute(sql)
    return res.fetchall()



def create_table():
    sql = """
    CREATE TABLE IF NOT EXISTS repository (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      repository_name TEXT,
      created_at TEXT,
      pushed_at TEXT,
      language TEXT,
      home_page TEXT,
      forks INT,
      stars INT,
      description TEXT
      )"""
    cur = con.cursor()
    cur.execute(sql)
    con.commit()

def scrape_repository(username):
    # pygithub object
    g = Github()
    # get that user by username
    user = g.get_user(username)
    # store repo into database
    for repo in user.get_repos():
        insert_repo(repo)

def main():
    db_path = "../db/github.db"
    global con
    con = create_connection(db_path)
    with con:
        scrape_website("")
        # creating table if not exists 
        # create_table()

        # scrape and store repository from user
        # scrape_repository("x4nth055")


if __name__ == '__main__':
    main()