const http = require('http');
const fs = require('fs/promises');

const requestHandler = async (request, response) => {
  const manifest = await fs.readFile('./package.json', 'utf-8');
  response.writeHead(200, {'Content-type': 'text/json'});
  return response.end(manifest);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    console.error('error');
  }
  console.log(`server works at port ${PORT}`);
});
