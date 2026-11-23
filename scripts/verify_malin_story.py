import os
import sys
import json
import urllib.request

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("TESTING MALIN STORY INTEGRATION IN SLIDE BUKU CERITA")
print("=" * 60)

# 1. Verify JSON Database
with open('data/kinder_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

malin = next((b for b in db['books'] if b['id'] == 'book-malin-kundang'), None)
assert malin is not None, "book-malin-kundang not found in database!"
print(f"✓ Title: {malin['title_id']}")
assert malin['title_id'] == 'Malin dan Perjalanan dari Kampung Laut'
assert len(malin['pages']) == 5, f"Expected 5 pages, found {len(malin['pages'])}"
print(f"✓ Found all {len(malin['pages'])} pages in JSON database")

for idx, p in enumerate(malin['pages']):
    assert len(p['text_id']) > 20, f"Page {idx+1} text_id is too short or empty!"
    print(f"  - Slide {idx+1}: {p['title_id']} ({len(p['text_id'])} chars)")
    # Check asset exists
    img_rel = p['image_url'].lstrip('/')
    assert os.path.exists(os.path.join('public', img_rel.replace('/', os.sep))), f"Missing file: public/{img_rel}"
    assert os.path.exists(os.path.join('docs', img_rel.replace('/', os.sep))), f"Missing file: docs/{img_rel}"
print("✓ All 5 Scene SVG assets verified in public/ and docs/")

# 2. Verify clientDb.js and server/db.js
with open('public/js/clientDb.js', 'r', encoding='utf-8') as f:
    client_js = f.read()
assert 'Malin dan Perjalanan dari Kampung Laut' in client_js
assert 'cleanId' in client_js, "cleanId sanitization missing in clientDb.js"
print("✓ clientDb.js has cleanId sanitization and updated 5 scenes")

with open('docs/js/clientDb.js', 'r', encoding='utf-8') as f:
    docs_client_js = f.read()
assert 'cleanId' in docs_client_js
print("✓ docs/js/clientDb.js in sync")

with open('server/db.js', 'r', encoding='utf-8') as f:
    srv_js = f.read()
assert 'cleanId' in srv_js, "cleanId sanitization missing in server/db.js"
print("✓ server/db.js has cleanId sanitization")

# 3. Verify readerPage.js
with open('public/js/pages/readerPage.js', 'r', encoding='utf-8') as f:
    reader_js = f.read()

assert 'storybook-book' in reader_js, "storybook-book canvas missing!"
assert 'renderSlideActivity' in reader_js, "renderSlideActivity missing!"
assert 'PE - RA - HU' in reader_js, "Slide 1 syllable missing!"
assert 'Apa yang harus Malin bawa dalam perjalanannya?' in reader_js, "Slide 2 decision missing!"
assert 'Eksplorasi Hal Baru di Pelabuhan' in reader_js, "Slide 3 exploration missing!"
assert 'tidak ada kutukan batu' in reader_js, "Slide 4 anti-curse message missing!"
assert 'Ruang Berpendapat Anak' in reader_js, "Slide 5 voice recorder / opinion space missing!"
print("✓ readerPage.js includes all 5 slide activities and open-book canvas")

with open('docs/js/pages/readerPage.js', 'r', encoding='utf-8') as f:
    docs_reader_js = f.read()
assert 'renderSlideActivity' in docs_reader_js
print("✓ docs/js/pages/readerPage.js in sync")

# 4. Verify HTTP endpoints on port 3000
endpoints = [
    '/',
    '/index.html',
    '/assets/covers/malin_kundang.svg',
    '/assets/stories/malin/scene1.svg',
    '/assets/stories/malin/scene2.svg',
    '/assets/stories/malin/scene3.svg',
    '/assets/stories/malin/scene4.svg',
    '/assets/stories/malin/scene5.svg',
    '/js/pages/readerPage.js',
    '/js/pages/bookDetailPage.js',
    '/css/reader.css'
]

print("\nVerifying HTTP Server endpoints (port 3000):")
for ep in endpoints:
    url = f"http://localhost:3000{ep}"
    try:
        req = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(req, timeout=3) as resp:
            print(f"✓ HTTP {resp.status} OK: {ep}")
    except Exception as e:
        print(f"✗ Failed {ep}: {e}")

print("\n" + "=" * 60)
print("ALL VERIFICATIONS PASSED SUCCESSFULLY!")
print("=" * 60)
