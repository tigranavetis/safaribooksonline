const https = require('https');
const path = require('path');
const fs = require('fs');

const videoName = id => `seg-${id}-v1-a1.ts`;
const url = (entryId, flavorId) => `https://kalhlspd-a.akamaihd.net/fhls/p/1926081/sp/192608100/serveFlavor/entryId/${entryId}/v/2/flavorId/${flavorId}/name/a.mp4`;

function tryToFetchUntilSuccess(url, file, filePath) {
  const req = https.get(url, res => {
    res.on('error', err => console.log('err', err));
    res.on('end', () => console.log('No more data in response', filePath, res.statusCode));
    if (res.statusCode !== 200) {
      console.log('res.statusCode', res.statusCode);
    }
    res.pipe(file);
  });

  req.on('error', err => {
    req.abort();

    tryToFetchUntilSuccess(url, file, filePath);
  });
}

const fetchVideoById = (id, url) => (pathName) => {
  const fileName = videoName(id);
  const filePath = path.resolve(pathName, fileName);
  const file = fs.createWriteStream(filePath);

  tryToFetchUntilSuccess(`${url}/${fileName}`, file, filePath);
}

const fetchVideos = (entryId, flavorId, number) => pathName => {
  const urlPath = url(entryId, flavorId);
  for (let id = 1; id <= number; id++) {
    fetchVideoById(id, urlPath)(pathName);
  }
}

module.exports = fetchVideos;
