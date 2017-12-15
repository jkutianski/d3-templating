const fs = require('fs');

var deleteFolder = function(path, callback) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
  if (callback) { callback(path); }
};

deleteFolder('build', function(path) {
	if (!fs.existsSync(path)){
	    fs.mkdirSync(path);
	}
});