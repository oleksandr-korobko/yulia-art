#!/usr/bin/env python3
"""
Test image compression on a single image to show quality/size comparison
"""
from PIL import Image
import os

# Test image
source = '/Users/OleksandrKorobko/Documents/My_first_real_projects/yulia-art/public/images/works/the-escape/01.jpg'
output = '/Users/OleksandrKorobko/Documents/My_first_real_projects/yulia-art/public/images/works/the-escape/01-compressed-test.jpg'

# Open image
img = Image.open(source)
original_size = os.path.getsize(source)

print(f"Original image: {source}")
print(f"Size: {img.size} ({img.width}x{img.height} pixels)")
print(f"File size: {original_size / 1024 / 1024:.2f} MB\n")

# Compress with quality 85
img.save(output, 'JPEG', quality=85, optimize=True, progressive=True)
compressed_size = os.path.getsize(output)

print(f"Compressed image: {output}")
print(f"File size: {compressed_size / 1024 / 1024:.2f} MB")
print(f"Reduction: {(1 - compressed_size / original_size) * 100:.1f}%")
print(f"\nSaved: {(original_size - compressed_size) / 1024 / 1024:.2f} MB per image")
print(f"\nQuality setting: 85 (recommended for web)")
print(f"Progressive: Yes (better loading experience)")
print(f"Optimized: Yes (smaller file size)")

# Estimate total savings
total_images = 153
estimated_total_savings = (original_size - compressed_size) * total_images / 1024 / 1024
print(f"\n📊 Estimated total savings for {total_images} images:")
print(f"   {estimated_total_savings:.0f} MB")
