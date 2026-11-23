import json

with open('data/kinder_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
for idx, b in enumerate(db['books']):
    print(f"{idx+1}. {b['id']} -> {b['title_id']} (category: {b.get('category')})")
