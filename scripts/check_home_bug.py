import json

# Check clientDb.js books
with open('public/js/clientDb.js', 'r', encoding='utf-8') as f:
    client_content = f.read()

# Check api.js
with open('public/js/api.js', 'r', encoding='utf-8') as f:
    api_content = f.read()

# Check homePage.js
with open('public/js/pages/homePage.js', 'r', encoding='utf-8') as f:
    home_content = f.read()

print("Checking homePage.js data extraction:")
if 'allBooks = booksData.books || [];' in home_content:
    print("CRITICAL BUG FOUND in homePage.js: `allBooks = booksData.books || [];` will be empty if booksData is an array!")

if 'allModules = modulesData.modules || [];' in home_content:
    print("CRITICAL BUG FOUND in homePage.js: `allModules = modulesData.modules || [];` will be empty if modulesData is an array!")
