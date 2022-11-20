//Readable and Writable Stream
const {createReadStream, createWriteStream} = require('fs');
const {pipeline} = require('stream').promises;

const openFileStream = createReadStream('constants.js');

const writeFileStream = createWriteStream('constants2.js');

(async() => {

    await pipeline(
        openFileStream,
        writeFileStream,
    );

    console.log('Done!');

})();