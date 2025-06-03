const https = require('https');
const fs = require('fs');
const LZ4 = require('lz4js');

const url = 'https://raw.githubusercontent.com/Kakcalu13/mock_web/main/test_compressed.txt';
const outputPath = 'output.webm';

https.get(url, (res) => {
  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const compressedBuffer = Buffer.concat(chunks);
    const decompressed = LZ4.decompress(new Uint8Array(compressedBuffer));
    fs.writeFile(outputPath, Buffer.from(decompressed), (err) => {
      if (err) {
        console.error('Failed to write webm file:', err);
      } else {
        console.log('Decompressed webm saved as:', outputPath);
      }
    });
  });
}).on('error', (err) => {
  console.error('Error fetching file:', err);
});
