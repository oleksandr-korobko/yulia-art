import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// ⚠️ ЗАМІНИ НА СВІЙ GITHUB USERNAME
const CONTENT_REPO = 'YOUR_USERNAME/yulia-art-content';
const CONTENT_BRANCH = 'main';
const CONTENT_DIR = path.join(process.cwd(), 'content');
const IMAGES_DIR = path.join(process.cwd(), 'public/images');

async function fetchContent() {
  console.log('📥 Fetching content from GitHub...');
  console.log(`   Repository: ${CONTENT_REPO}`);
  console.log(`   Branch: ${CONTENT_BRANCH}`);

  // Видаляємо стару папку content якщо є
  if (fs.existsSync(CONTENT_DIR)) {
    fs.rmSync(CONTENT_DIR, { recursive: true });
    console.log('🗑️  Removed old content/');
  }

  // Клонуємо контент-репо (shallow clone для швидкості)
  const tempDir = path.join(process.cwd(), '.content-temp');

  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }

  try {
    console.log('⬇️  Cloning content repository...');
    execSync(
      `git clone --depth 1 --branch ${CONTENT_BRANCH} https://github.com/${CONTENT_REPO}.git ${tempDir}`,
      { stdio: 'pipe' }
    );

    // Створюємо папку content
    fs.mkdirSync(CONTENT_DIR, { recursive: true });

    // Копіюємо works
    const worksSource = path.join(tempDir, 'works');
    const worksDest = path.join(CONTENT_DIR, 'works');
    if (fs.existsSync(worksSource)) {
      fs.cpSync(worksSource, worksDest, { recursive: true });
      const worksCount = fs.readdirSync(worksDest).filter(f => f.endsWith('.md')).length;
      console.log(`✅ Copied works/ (${worksCount} files)`);
    } else {
      console.log('⚠️  No works/ folder found in content repo');
      fs.mkdirSync(worksDest, { recursive: true });
    }

    // Копіюємо category-order.json
    const orderSource = path.join(tempDir, 'category-order.json');
    const orderDest = path.join(CONTENT_DIR, 'category-order.json');
    if (fs.existsSync(orderSource)) {
      fs.copyFileSync(orderSource, orderDest);
      console.log('✅ Copied category-order.json');
    } else {
      console.log('⚠️  No category-order.json found, creating empty one');
      fs.writeFileSync(
        orderDest,
        JSON.stringify(
          {
            installations: [],
            sculptures: [],
            paintings: [],
            ceramics: [],
            'text-informed': [],
          },
          null,
          2
        )
      );
    }

    // Копіюємо images в public/images/
    const imagesSource = path.join(tempDir, 'images');
    if (fs.existsSync(imagesSource)) {
      // Створюємо public/images якщо не існує
      fs.mkdirSync(IMAGES_DIR, { recursive: true });
      fs.cpSync(imagesSource, IMAGES_DIR, { recursive: true });
      console.log('✅ Copied images/ to public/images/');
    } else {
      console.log('⚠️  No images/ folder found in content repo');
    }

    // Видаляємо тимчасову папку
    fs.rmSync(tempDir, { recursive: true });

    console.log('');
    console.log('🎉 Content fetched successfully!');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ Failed to fetch content:', error);
    console.error('');
    console.error('Make sure:');
    console.error(`   1. Repository ${CONTENT_REPO} exists`);
    console.error('   2. Repository is public OR you have access');
    console.error(`   3. Branch "${CONTENT_BRANCH}" exists`);
    console.error('');

    // Створюємо порожню структуру щоб build не падав
    console.log('📁 Creating empty content structure...');
    fs.mkdirSync(path.join(CONTENT_DIR, 'works'), { recursive: true });
    fs.writeFileSync(
      path.join(CONTENT_DIR, 'category-order.json'),
      JSON.stringify(
        {
          installations: [],
          sculptures: [],
          paintings: [],
          ceramics: [],
          'text-informed': [],
        },
        null,
        2
      )
    );
    console.log('✅ Empty content structure created');
  }
}

fetchContent();
