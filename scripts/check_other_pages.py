import os

pages_dir = 'public/js/pages'
for f in os.listdir(pages_dir):
    if f.endswith('.js'):
        path = os.path.join(pages_dir, f)
        with open(path, 'r', encoding='utf-8') as fp:
            content = fp.read()
        if '.books' in content or '.modules' in content:
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if ('.books' in line or '.modules' in line) and ('||' in line or '=' in line) and not line.strip().startswith('//'):
                    print(f"{f}:{i+1} -> {line.strip()}")
