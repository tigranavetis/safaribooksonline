const configs = {
  path: process.env.FOLDER,
};

const checkConfig = (configObj) => {
  Object.keys(configObj).forEach((prop) => {
    switch(typeof configObj[prop]) {
      case 'undefined':
        throw new Error(`${prop} environment variable is not set.`);
      case 'object':
        checkConfig(configObj[prop]);
        break;
    }
  });
};

checkConfig(configs);

module.exports = configs;
