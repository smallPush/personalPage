import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, statSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');

function findTestFiles(dir, files = []) {
    const items = readdirSync(dir);
    for (const item of items) {
        const path = join(dir, item);
        if (statSync(path).isDirectory()) {
            findTestFiles(path, files);
        } else if (item.endsWith('.test.js')) {
            files.push(path);
        }
    }
    return files;
}

const testFiles = findTestFiles(join(rootDir, 'src'));

if (testFiles.length === 0) {
    console.log('No test files found.');
    process.exit(0);
}

let failed = false;

testFiles.forEach(file => {
    const relativePath = file.replace(rootDir, '');
    console.log(`\nTesting: ${relativePath}`);
    const result = spawnSync('node', [file], { stdio: 'inherit' });
    if (result.status !== 0) {
        failed = true;
    }
});

if (failed) {
    console.log('\n❌ Some tests failed.');
    process.exit(1);
} else {
    console.log('\n✅ All tests passed.');
    process.exit(0);
}
