# Github Scraper
The Objective of this project is to scrape information from a Github user repositories page, and store the data in database, then having Nodejs as REST Api to provide data to display on frontend which using Angular.
![snapshot](./snapshot/snapshot.PNG "Title")
## Specification
  - Frontend: Angular v14
  - Backend: Nodejs
  - Database: SQLite
  - Script: python
## Installation
### Script
Use the package manager pip to install module dependency.
```bash
pip install bs4 requests pyyaml
```
### Frontend and Backend
User npm to install packages for frontend and backend.
```bash
npm install
```

## Usage
### Python Script
Modify the config.yaml file to have github username list:
```yaml
username:
    - <GITHUB_ACCOUNT_NAME_1>
    - <GITHUB_ACCOUNT_NAME_2>
```
Then run the script inside folder `\scripts`:
```console
python ./github_scraper.py
```

### Backend
When all information are acquired by using the script file, we can run the REST Api by using Nodejs. Go to the folder `\backend` and run command below
```bash
node index.js
```
After it spined up, the REST Api service will be available at `localhost:3000` 

### Frontend
Open the `\frontend` folder and run command below to bring UI up:
```bash
npm start
```
The UI will be ready at `localhost:4200`