// Node 16 required
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;
const { createDecipheriv } = require("crypto");
const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const { ENCRYPTION_SALT } = require('./constants');

const [, , readFileName, writeFileName, password] = process.argv;

const openFileStream = createReadStream(readFileName);

const writeFileStream = createWriteStream(writeFileName);

(async () => {

    const algorithm = 'aes-192-cbc';
    const key = await scrypt(password, ENCRYPTION_SALT, 24);

    await pipeline(
        openFileStream,
        createDecipheriv(algorithm, key),
        writeFileStream,
    );

    console.log('Done!');

})();