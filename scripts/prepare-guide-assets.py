from pathlib import Path
from PIL import Image

source_dir = Path('/home/ubuntu/webdev-static-assets')
target_dir = Path('/home/ubuntu/ai-mastery/assets/guide')
target_dir.mkdir(parents=True, exist_ok=True)

assets = [
    ('geo-measurement-hero.png', 'geo-measurement-hero.webp', 1600, 900, 84),
    ('geo-evidence-layers.png', 'geo-evidence-layers.webp', 1200, 900, 84),
    ('geo-measurement-ladder.png', 'geo-measurement-ladder.webp', 1200, 900, 84),
]

for source_name, webp_name, width, height, quality in assets:
    source = source_dir / source_name
    if not source.exists():
        raise FileNotFoundError(source)
    image = Image.open(source).convert('RGB')
    image.thumbnail((width, height), Image.Resampling.LANCZOS)
    destination = target_dir / webp_name
    image.save(destination, 'WEBP', quality=quality, method=6)
    print(f'{destination}: {image.width}x{image.height}, {destination.stat().st_size} bytes')
