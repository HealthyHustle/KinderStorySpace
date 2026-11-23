import re

with open('public/js/clientDb.js', 'r', encoding='utf-8', errors='replace') as f:
    text = f.read()

idx = text.find("'book-malin-kundang'")
print("Found 'book-malin-kundang' at index:", idx)
if idx != -1:
    end_pages = text.find('pages: [', idx)
    print("Found 'pages: [' at:", end_pages)
    if end_pages != -1:
        # print up to next book
        next_book = text.find("id: 'book-", end_pages)
        print("Pages block:")
        print(text[end_pages:end_pages+1200])
