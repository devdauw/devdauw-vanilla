"use strict";
import http from 'node:http';
import * as fs from 'node:fs/promises';
import path from 'node:path';

const PORT = process.env.PORT || 8080;
const buildPath = path.join(process.cwd(), 'build/')

const servePage = async (request, response) => {
 const url = request.url;

 if (url === "/") {
  try {
    const htmlFile = await fs.readFile(buildPath + "index.html");
    response.writeHead(200);
    response.write(htmlFile);
    response.end();
    return;
  } catch (error) {
    console.error(`Error while grabbing our index.html, that's bad: `, error);
  }
 }

 const htmlExtensionRegex = new RegExp(".*\.(html)");
 if (htmlExtensionRegex.test(url)) {
  try {
    const htmlFile = await fs.readFile(buildPath + url);
    if (htmlFile) {
      response.writeHead(200);
      response.write(htmlFile);
      response.end();
      return;
    }
  } catch (error) {
    console.error(`Error while grabbing htmFile @${url}: `, error);
  }
 }

 const cssExtensionRegex = new RegExp(".*\.(css)")
 if (cssExtensionRegex.test(url)) {
  try {
    const cssFile = await fs.readFile(buildPath + url);
    if (cssFile) {
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(cssFile);
      response.end();
      return;
    }
  } catch (error) {
    console.error(`Error while grabbing cssFile @${url}: `, error);
  }
 }

 const jsExtensionRegex = new RegExp(".*\.(js)");
 if (jsExtensionRegex.test(url)) {
  try {
    const jsFile = await fs.readFile(buildPath + url);
    response.writeHead(200, { 'Content-Type': 'text/javascript' });
    response.write(jsFile);
    response.end();
    return;
  } catch (error) {
    console.error(`Error while grabbing jsFile @${url}: `, error);
  }
 }

 console.error(`An user tried to access ${url}. The requesting IP address was ${request.socket.remoteAddress}`);
 try {
  const htmlErrorFile = await fs.readFile(buildPath + "404.html");
  response.writeHead(404);
  response.write(htmlErrorFile);
  response.end();
  return;  
 } catch (error) {
  console.error('Our 404 page was not found, what are we gonna do?!', error);
 }
}

const server = http.createServer();

server.listen(PORT);

server.on('request', (request, response) => {
  servePage(request, response);
});


