#!/usr/bin/env python3
"""
Compress all artwork images for web optimization
- Creates backup of originals
- Compresses with quality 85
- Progressive JPEG for better loading
"""
from PIL import Image
import os
import shutil
from pathlib import Path

# Paths
works_dir = Path('/Users/OleksandrKorobko/Documents/My_first_real_projects/yulia-art/public/images/works')
backup_dir = Path('/Users/OleksandrKorobko/Documents/My_first_real_projects/yulia-art/public/images/works-original-backup')

# Stats
total_original_size = 0
total_compressed_size = 0
files_processed = 0
files_skipped = 0

print("🔄 Starting image compression...\n")

# Step 1: Create backup
if not backup_dir.exists():
    print(f"📦 Creating backup directory: {backup_dir}")
    backup_dir.mkdir(parents=True, exist_ok=True)

    print("📦 Copying original images to backup...")
    shutil.copytree(works_dir, backup_dir, dirs_exist_ok=True)
    print("✅ Backup created!\n")
else:
    print("ℹ️  Backup already exists, skipping...\n")

# Step 2: Compress all images
print("🗜️  Compressing images...\n")

for img_path in works_dir.rglob('*'):
    if img_path.suffix.lower() in ['.jpg', '.jpeg']:
        # Skip test files
        if 'compressed-test' in img_path.name:
            continue

        try:
            # Get original size
            original_size = img_path.stat().st_size

            # Open and compress
            img = Image.open(img_path)

            # Convert RGBA to RGB if needed
            if img.mode == 'RGBA':
                img = img.convert('RGB')

            # Save compressed version (overwrite original)
            img.save(
                img_path,
                'JPEG',
                quality=85,
                optimize=True,
                progressive=True
            )

            # Get new size
            compressed_size = img_path.stat().st_size

            # Update stats
            total_original_size += original_size
            total_compressed_size += compressed_size
            files_processed += 1

            reduction = (1 - compressed_size / original_size) * 100
            print(f"✓ {img_path.relative_to(works_dir)}: {original_size/1024/1024:.2f}MB → {compressed_size/1024/1024:.2f}MB ({reduction:.1f}%)")

        except Exception as e:
            print(f"✗ Error processing {img_path.name}: {e}")
            files_skipped += 1

# Step 3: Print summary
print("\n" + "="*60)
print("📊 COMPRESSION SUMMARY")
print("="*60)
print(f"Files processed: {files_processed}")
print(f"Files skipped: {files_skipped}")
print(f"\nOriginal total size: {total_original_size/1024/1024:.2f} MB")
print(f"Compressed total size: {total_compressed_size/1024/1024:.2f} MB")
print(f"Total saved: {(total_original_size - total_compressed_size)/1024/1024:.2f} MB")
print(f"Average reduction: {(1 - total_compressed_size/total_original_size)*100:.1f}%")
print(f"\n✅ Compression complete!")
print(f"📦 Original files backed up to: {backup_dir}")
