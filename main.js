
const fs = require('fs')
var beautify = require("json-beautify");
const csv = require('csv-parser')
const users = [];

function main() {
  const readStream = readFile('input.csv');
  readStream.on('end', () => {
      saveToFile(users);
      readJsonFile('User.js');
  });
}

function readFile(fileName) {
  return fs.createReadStream(fileName)
  .pipe(csv())
  .on('data',  (row) => {
    if (row) {
      const user = {
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        gender: row.gender,
        ipAddress: row.ip_address,
        color: row.color,
        parentId: row.parentId
      };
      users.push(user)
    }
  });
}

function  saveToFile(users) {
  fs.writeFile("User.js",JSON.stringify(users), () => {});
}

function readJsonFile(file) {
  fs.readFile(file, 'utf8', (err, users) => {
    if (err) throw err;

    console.log(beautify(JSON.parse(users), null, 2));
  });
}

main();