"use strict";

const http=require('http');

const port   =process.env.PORT || 3000;
const ip_addr=process.env.IP   || "0.0.0.0";

const server=http.createServer( (request,response)=> {
  response.end('Url: ' + request.url + "\nTime: "+ new Date());
});

server.listen(port,ip_addr,() => {
  console.log('The simple server started.');
});
