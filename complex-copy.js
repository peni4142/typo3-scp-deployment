const fs = require("fs");
const path = require("path");

const ROOT_PATH = "./";
const DEPLOYMENT_PATH = "./deployment";
const IGNORING_PATHS = [".git/", ".github/", "typo3-scp-deployment-template/"];

function readPath(path, onFile, onDirectory) {
  const lstat = fs.lstatSync(path);
  if (IGNORING_PATHS.some((p) => path.includes(p))) {
    return;
  }
  if (lstat.isFile()) {
    onFile(path);
  } else if (lstat.isDirectory()) {
    onDirectory(path);
  }
}

function saveCopy(source, target) {
  // create directory if not exists
  const dir = path.dirname(target);
  fs.mkdirSync(dir, { recursive: true });

  // copy content
  const content = fs.readFileSync(source);
  fs.writeFileSync(target, content);
}

function onFile(source) {
  const filename = path.basename(source);
  const relativePath = path.relative(ROOT_PATH, source);
  const targetPath = path.join(DEPLOYMENT_PATH, relativePath);

  saveCopy(relativePath, targetPath);
}

function onDir(source) {
  fs.readdirSync(source).forEach((p) => {
    const newPath = path.join(source, p);
    readPath(newPath, onFile, onDir);
  });
}

function removePotentialDeployment() {
  if (fs.existsSync(DEPLOYMENT_PATH)) {
    fs.rmSync(DEPLOYMENT_PATH, { recursive: true, force: true });
  }
}

function act() {
  removePotentialDeployment();
  onDir(ROOT_PATH); // copy
}

act();
