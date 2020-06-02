const s3 = require('./init-S3-client');
const fs = require('fs');
const path = require('path');   

const filePath = path.join(__dirname, '../cat.jpg');


fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log('Error getting the file');
    return;
  }

  const date = new Date();
  const timestamp = date.getTime();
  const bucketName = 'samuele-demo-1-team-bucket'
  
  const params = {
    Bucket: bucketName,
    Key: `my-folder/my-picture-${timestamp}`,
    Body: data,
    ACL: 'public-read',
  };
  const request = s3.putObject(params);
  request.on('httpHeaders', (statusCode, headers) => {
    const ipfsHash = headers['x-fleek-ipfs-hash'];
    console.log('ipfs hash:', ipfsHash);
    // Do stuff with ifps hash....
    const ipfsHashV0 = headers['x-fleek-ipfs-hash-v0'];
    // Do stuff with the short v0 ipfs hash... (appropriate for storing on blockchains)
  }).send();
})




