from pprint import pprint
import sqlite3
import requests
from bs4 import BeautifulSoup
import yaml

# database connection
con = None
# config
config = None

default_db_path = "../db/github.db"
config_file = "config.yaml"

def create_connection(db_file_path):
    try:
        con = sqlite3.connect(db_file_path)
    except:
        print("Can't connect to database")
    return con

def scrape_github_repos(username):
    pageNum = 1
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

def load_config():
    global config
    with open(config_file, "r") as yamlfile:
        config = yaml.load(yamlfile, Loader=yaml.FullLoader)


def main():
    global con
    # load config file
    load_config()
    # create/connect to database SQLite
    con = create_connection(config['db_path'] if 'db_path' in config else default_db_path)
    with con:
        # create 'Repository' table if not exist
        create_table()
        # run scrape function
        for user in config['github_users']:
            scrape_github_repos(user)


if __name__ == '__main__':
    main()
