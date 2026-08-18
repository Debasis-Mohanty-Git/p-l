const fs = require('fs');
const path = require('path');

const serverDir = path.join(__dirname, 'server');
const apiDir = path.join(__dirname, 'api');

if (fs.existsSync(serverDir)) {
  fs.renameSync(serverDir, apiDir);
}

// Rename api/src/server.js to api/index.js
const oldServerJs = path.join(apiDir, 'src', 'server.js');
const newIndexJs = path.join(apiDir, 'index.js');
if (fs.existsSync(oldServerJs)) {
  fs.renameSync(oldServerJs, newIndexJs);
}

// Update paths in api/index.js
let indexContent = fs.readFileSync(newIndexJs, 'utf8');
indexContent = indexContent.replace("./routes/pnlRoutes", "./src/routes/pnlRoutes");
fs.writeFileSync(newIndexJs, indexContent);

// Update package.json to reflect new structure
const pkgJsonPath = path.join(apiDir, 'package.json');
if (fs.existsSync(pkgJsonPath)) {
  let pkgContent = fs.readFileSync(pkgJsonPath, 'utf8');
  pkgContent = pkgContent.replace("src/server.js", "index.js").replace("src/server.js", "index.js");
  fs.writeFileSync(pkgJsonPath, pkgContent);
}

console.log("Restructured server to api successfully!");
