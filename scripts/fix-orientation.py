#!/usr/bin/env python3
"""
Fix image orientation by reading EXIF data and rotating images physically
This ensures images display correctly after EXIF data is stripped
"""
from PIL import Image, ExifTags
from pathlib import Path

# Paths
works_dir = Path('/Users/OleksandrKorobko/Documents/My_first_real_projects/yulia-art/public/images/works')
backup_dir = Path('/Users/OleksandrKorobko/Documents/My_first_real_projects/yulia-art/public/images/works-original-backup')

print("🔄 Fixing image orientation from EXIF data...\n")

files_fixed = 0
files_skipped = 0

# Process all images
for img_path in works_dir.rglob('*.jpg'):
    # Find corresponding backup
    relative_path = img_path.relative_to(works_dir)
    backup_path = backup_dir / relative_path

    if not backup_path.exists():
        print(f"⚠️  No backup for {relative_path}, skipping...")
        files_skipped += 1
        continue

    try:
        # Open backup image (has EXIF data)
        img = Image.open(backup_path)

        # Get EXIF orientation
        orientation = None
        if hasattr(img, '_getexif') and img._getexif() is not None:
            exif = img._getexif()
            for tag, value in exif.items():
                if ExifTags.TAGS.get(tag) == 'Orientation':
                    orientation = value
                    break

        # Apply rotation based on EXIF orientation
        if orientation:
            if orientation == 3:
                img = img.rotate(180, expand=True)
                print(f"🔄 {relative_path}: Rotated 180°")
            elif orientation == 6:
                img = img.rotate(270, expand=True)
                print(f"🔄 {relative_path}: Rotated 270° (portrait)")
            elif orientation == 8:
                img = img.rotate(90, expand=True)
                print(f"🔄 {relative_path}: Rotated 90°")
            else:
                print(f"✓ {relative_path}: Already correct (orientation={orientation})")
                files_skipped += 1
                continue
        else:
            print(f"✓ {relative_path}: No EXIF orientation data")
            files_skipped += 1
            continue

        # Convert RGBA to RGB if needed
        if img.mode == 'RGBA':
            img = img.convert('RGB')

        # Save with correct orientation (without EXIF)
        img.save(
            img_path,
            'JPEG',
            quality=85,
            optimize=True,
            progressive=True
        )

        files_fixed += 1

    except Exception as e:
        print(f"✗ Error processing {relative_path}: {e}")

print("\n" + "="*60)
print("📊 ORIENTATION FIX SUMMARY")
print("="*60)
print(f"Files fixed: {files_fixed}")
print(f"Files skipped: {files_skipped}")
print(f"\n✅ Orientation fix complete!")
