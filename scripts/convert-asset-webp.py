from pathlib import Path
from PIL import Image

src = Path('/home/ubuntu/webdev-static-assets/technical-seo-geo-authority-graph.png')
dst = Path('/home/ubuntu/webdev-static-assets/technical-seo-geo-authority-graph.webp')
with Image.open(src) as image:
    image.convert('RGB').save(dst, 'WEBP', quality=88, method=6)
print(dst)
