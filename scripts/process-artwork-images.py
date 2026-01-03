#!/usr/bin/env python3
"""
Script to process artwork images from ZIP files.
Renames files to cover.jpg and 01.jpg, 02.jpg, etc.

Usage:
    python3 scripts/process-artwork-images.py <zip_path> <work_slug>

Example:
    python3 scripts/process-artwork-images.py ~/Downloads/artwork.zip lost-dreams
"""

import os
import shutil
import re
import sys
from pathlib import Path
import zipfile

def slugify(text):
    """Convert text to slug format"""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def process_zip(zip_path, work_slug, dest_base=None):
    """
    Process a ZIP file containing artwork images.

    Args:
        zip_path: Path to ZIP file
        work_slug: Slug name for the work (e.g., 'lost-dreams')
        dest_base: Base directory for output (default: public/images/works)
    """
    if dest_base is None:
        # Auto-detect project root (script is in scripts/ folder)
        script_dir = Path(__file__).parent
        project_root = script_dir.parent
        dest_base = project_root / "public/images/works"

    zip_path = Path(zip_path)
    dest_dir = Path(dest_base) / work_slug

    if not zip_path.exists():
        print(f"❌ ZIP file not found: {zip_path}")
        return False

    # Create temp extraction directory
    temp_dir = Path("/tmp") / f"artwork-temp-{work_slug}"
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir(parents=True)

    print(f"📦 Extracting {zip_path.name}...")

    # Extract ZIP
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(temp_dir)

    # Find all image files (recursively, in case they're in a subfolder)
    image_files = []
    for ext in ['*.jpg', '*.jpeg', '*.png', '*.JPG', '*.JPEG', '*.PNG']:
        image_files.extend(temp_dir.rglob(ext))

    if not image_files:
        print(f"❌ No images found in {zip_path.name}")
        shutil.rmtree(temp_dir)
        return False

    # Sort files by number in filename
    files_with_nums = []
    for f in image_files:
        # Try to extract number from filename
        match = re.search(r'_(\d+)', f.stem)
        if match:
            num = int(match.group(1))
            files_with_nums.append((num, f))
        else:
            # If no number, use filename for sorting
            files_with_nums.append((0, f.name))

    files_with_nums.sort(key=lambda x: (x[0], str(x[1])))

    # Clean destination directory
    dest_dir.mkdir(parents=True, exist_ok=True)
    for f in dest_dir.glob("*"):
        f.unlink()

    print(f"📸 Processing {len(files_with_nums)} images...")

    # First file becomes cover.jpg
    if files_with_nums:
        _, first_file = files_with_nums[0]
        shutil.copy2(first_file, dest_dir / "cover.jpg")
        print(f"  ✅ Cover: {first_file.name}")

        # Rest become 01.jpg, 02.jpg, etc.
        for i, (_, filepath) in enumerate(files_with_nums[1:], 1):
            new_name = f"{i:02d}.jpg"
            shutil.copy2(filepath, dest_dir / new_name)
            print(f"  ✅ {filepath.name} → {new_name}")

    # Cleanup
    shutil.rmtree(temp_dir)

    print(f"✅ {work_slug}: {len(files_with_nums)} files (1 cover + {len(files_with_nums)-1} gallery)\n")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 scripts/process-artwork-images.py <zip_path> <work_slug>")
        print("Example: python3 scripts/process-artwork-images.py ~/Downloads/artwork.zip lost-dreams")
        sys.exit(1)

    zip_path = sys.argv[1]
    work_slug = sys.argv[2]

    success = process_zip(zip_path, work_slug)
    sys.exit(0 if success else 1)
