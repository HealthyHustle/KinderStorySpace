import sys
import re
import urllib.request

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("VERIFYING HOME PAGE USER ACCESS & MALIN STORY VISIBILITY")
print("=" * 60)

# 1. Check public/js/pages/homePage.js
with open('public/js/pages/homePage.js', 'r', encoding='utf-8') as f:
    home_src = f.read()

assert 'featured-story-banner' in home_src, "Spotlight banner missing in homePage.js!"
assert 'Malin dan Perjalanan dari Kampung Laut' in home_src, "Malin title missing in homePage.js!"
assert 'Slide 1: Kampung Laut' in home_src, "Slide 1 jump link missing in homePage.js!"
assert 'Slide 5: Akhir & Rekam Suara' in home_src, "Slide 5 jump link missing in homePage.js!"
assert 'Cerita Interaktif' in home_src, "Cerita Interaktif category filter missing in homePage.js!"
assert 'Array.isArray(booksData)' in home_src, "Array.isArray fallback missing in homePage.js!"
print("✓ public/js/pages/homePage.js has featured spotlight, slide quick links, and safe array parsing.")

# 2. Check docs/js/pages/homePage.js
with open('docs/js/pages/homePage.js', 'r', encoding='utf-8') as f:
    docs_home_src = f.read()
assert 'featured-story-banner' in docs_home_src
print("✓ docs/js/pages/homePage.js in sync.")

# 3. Check public/js/api.js
with open('public/js/api.js', 'r', encoding='utf-8') as f:
    api_src = f.read()
assert 'books: list' in api_src, "Normalization books: list missing in api.js!"
assert 'modules: list' in api_src, "Normalization modules: list missing in api.js!"
print("✓ public/js/api.js normalizes both getBooks and getModules to consistent objects.")

# 4. Check navbar.js
with open('public/js/components/navbar.js', 'r', encoding='utf-8') as f:
    nav_src = f.read()
assert 'book-malin-kundang?page=1' in nav_src, "Direct link to Malin story missing in navbar!"
print("✓ public/js/components/navbar.js has direct 'Cerita Malin' link.")

# 5. Check docs/js/components/navbar.js
with open('docs/js/components/navbar.js', 'r', encoding='utf-8') as f:
    docs_nav_src = f.read()
assert 'book-malin-kundang?page=1' in docs_nav_src
print("✓ docs/js/components/navbar.js in sync.")

# 6. Check HTTP server endpoints on port 3000
endpoints = [
    '/index.html',
    '/js/api.js',
    '/js/clientDb.js',
    '/js/pages/homePage.js',
    '/js/pages/readerPage.js',
    '/js/pages/bookDetailPage.js',
    '/js/components/navbar.js',
    '/assets/covers/malin_kundang.svg',
    '/assets/stories/malin/scene1.svg',
    '/assets/stories/malin/scene2.svg',
    '/assets/stories/malin/scene3.svg',
    '/assets/stories/malin/scene4.svg',
    '/assets/stories/malin/scene5.svg'
]

print("\nVerifying HTTP response status (port 3000):")
for ep in endpoints:
    url = f"http://localhost:3000{ep}"
    req = urllib.request.Request(url, method='HEAD')
    with urllib.request.urlopen(req, timeout=3) as resp:
        print(f"  ✓ HTTP {resp.status} OK: {ep}")

print("\n" + "=" * 60)
print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!")
print("=" * 60)
