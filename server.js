"use strict";
import http from 'node:http';
import * as fs from 'node:fs/promises';
import path from 'node:path';

const PORT = process.env.PORT || 8080;
const buildPath = path.join(process.cwd(), 'build/')

const servePage = async (request, response) => {
 const url = request.url;

 if (url === "/") {
  const htmlFile = await fs.readFile(buildPath + "index.html");
  response.writeHead(200);
  response.write(htmlFile);
  response.end();
 }

 const htmlExtensionRegex = new RegExp(".*\.(html|css)");
 if (htmlExtensionRegex.test(url)) {
  const htmlFile = await fs.readFile(buildPath + url);
  if (htmlFile) {
    response.writeHead(200);
    response.write(htmlFile);
    response.end();
  }
 }

 const jsExtensionRegex = new RegExp(".*\.(js)");
 if (jsExtensionRegex.test(url)) {
  const jsFile = await fs.readFile(buildPath + url);
  response.writeHead(200, { 'Content-Type': 'text/javascript', });
  response.write(jsFile);
  response.end();
 }

 const htmlFile = await fs.readFile(buildPath + "404.html");
 response.writeHead(404);
 response.write(htmlFile);
 response.end();
 return;  
}

const server = http.createServer();

server.listen(PORT);

server.on('request', (request, response) => {
  servePage(request, response);
});


