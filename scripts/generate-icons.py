#!/usr/bin/env python3
"""
Generate favicon and Apple touch icon from portrait photo
"""
from PIL import Image
import os

# Paths
source_image = '/Users/OleksandrKorobko/Downloads/фото замість лого.jpg'
output_dir = '/Users/OleksandrKorobko/Documents/My_first_real_projects/yulia-art/public'

# Open and process source image
print(f"Opening source image: {source_image}")
img = Image.open(source_image)

# Convert to RGB if needed (for .ico format)
if img.mode != 'RGB':
    img = img.convert('RGB')

# Get image dimensions
width, height = img.size
print(f"Original dimensions: {width}x{height}")

# Calculate crop to get square centered on face
# The face appears to be roughly in the center-top portion
# We'll crop a square from the center
size = min(width, height)
left = (width - size) // 2
top = max(0, (height - size) // 2 - int(size * 0.15))  # Shift up slightly to center face
right = left + size
bottom = top + size

# Crop to square
img_square = img.crop((left, top, right, bottom))
print(f"Cropped to square: {size}x{size}")

# Generate favicon.ico (32x32)
favicon = img_square.resize((32, 32), Image.Resampling.LANCZOS)
favicon_path = os.path.join(output_dir, 'favicon.ico')
favicon.save(favicon_path, format='ICO', sizes=[(32, 32)])
print(f"✓ Created favicon.ico: {favicon_path}")

# Generate apple-touch-icon.png (180x180)
apple_icon = img_square.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon_path = os.path.join(output_dir, 'apple-touch-icon.png')
apple_icon.save(apple_icon_path, format='PNG', optimize=True)
print(f"✓ Created apple-touch-icon.png: {apple_icon_path}")

# Also create a larger version for og-image (1200x630 - landscape)
# For og-image, we'll use a wider crop that includes shoulders
og_width = int(height * 1.905)  # 1200/630 ratio
og_left = max(0, (width - og_width) // 2)
og_right = min(width, og_left + og_width)
og_top = 0
og_bottom = height

og_crop = img.crop((og_left, og_top, og_right, og_bottom))
og_image = og_crop.resize((1200, 630), Image.Resampling.LANCZOS)
og_image_path = os.path.join(output_dir, 'og-image.jpg')
og_image.save(og_image_path, format='JPEG', quality=85, optimize=True)
print(f"✓ Created og-image.jpg: {og_image_path}")

print("\n✅ All icons generated successfully!")
