"use strict";

const http=require('http');

const port   =process.env.PORT || 3000;
const ip_addr=process.env.IP   || "0.0.0.0";

const server=http.createServer( (request,response)=> {
  setTimeout( ()=>{
    response.end('Path: ' + request.url + "\nTime: "+ new Date());
  },1000);
});

server.listen(port,ip_addr,() => {
  console.log('The deleayed echo server started.');
});
