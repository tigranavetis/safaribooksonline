const path = require('path');
const fs = require('fs');

const configs = require('./configs');
const content = require('./content');

const { createNewDirectory } = require('./src');

const pathName = path.resolve(__dirname + configs.path);
console.log(`Started process ${process.pid}`);

if (!fs.existsSync(pathName)) {
  fs.mkdir(pathName, err => {
    if (err) {
      throw err;
    }
    else {
      console.log(`"${configs.path}" is created`);
      createNewDirectory(content, pathName);
    }
  });
} else {
  console.log(`"${configs.path}" already exists`);
}

process.on('uncaughtException', err => {
  console.error('Whoops! there was an error', err);
});
