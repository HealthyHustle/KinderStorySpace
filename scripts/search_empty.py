import os

pages_dir = 'public/js/pages'
for fname in os.listdir(pages_dir):
    if fname.endswith('.js'):
        fpath = os.path.join(pages_dir, fname)
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
        for i, line in enumerate(lines):
            if 'Tentang Cerita' in line or 'Cerita' in line and ('kosong' in line.lower() or 'belum' in line.lower() or 'empty' in line.lower() or 'pages' in line):
                print(f"{fname}:{i+1} -> {line.strip()[:100]}")
