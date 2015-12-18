
"use strict";

// npm install express --save
const express=require('express');

const port   =process.env.PORT || 3000;
const ip_addr=process.env.IP   || "0.0.0.0";

const app=express();

app.get('/', (request,response)=> {
  response.send('Express: ' + request.url + "\nTime: "+ new Date());
});

app.use(express.static('WWW'));

app.listen(port,ip_addr,() => {
  console.log('The express server started.');
});
