const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const server = http.createServer((req, res) => {
  const cleanUrl = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'text/plain' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3388, () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outPath = path.join(__dirname, 'anime_section_preview.png');
  const cmd = `"${edgePath}" --headless=new --screenshot="${outPath}" --window-size=1440,2400 http://localhost:3388/`;
  try {
    execSync(cmd);
    console.log('Success screenshot:', fs.existsSync(outPath), fs.statSync(outPath).size);
  } catch (e) {
    console.error('Error running screenshot:', e.message);
  } finally {
    server.close();
    process.exit(0);
  }
});
