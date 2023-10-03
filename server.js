"use strict";
import http from 'node:http';
import * as fs from 'node:fs/promises';

const servePage = async (request, response) => {
 const url = request.url;

  if (url === "/") {
    const file = await fs.readFile("./index.html");
    response.writeHead(200);
    response.write(file);
    response.end();
  }

  const file = await fs.readFile("./pages/404.html");
  response.writeHead(404);
  response.write(file);
  response.end();
}

const server = http.createServer();

server.listen(8080);

server.on('request', (request, response) => {
  servePage(request, response);
});


