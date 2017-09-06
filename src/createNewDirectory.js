const fs = require('fs');

const fetchVideos = require('./fetchVideos');

const createNewDirectory = (content = [], path) => {
  return content.map(node => {
    if (node.title) {
      const pathName = `${path}/${node.title}`;

      if (!fs.existsSync(pathName)) {
        fs.mkdir(pathName, err => {
          if (err) throw err;
          console.log(`"${node.title}" is created`);

          if (node.entryId && node.flavorId && node.number) {
            fetchVideos(node.entryId, node.flavorId, node.number)(pathName);
          } else {
            console.log('There are some missing properties in your config');
          }
          if (node.subFolders) {
            createNewDirectory(node.subFolders, pathName);
          }
        });
      }
    }
  });
}

module.exports = createNewDirectory;
