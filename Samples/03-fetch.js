"use strict";

const http=require('http');

const url1='https://echo-yaakov-belch.c9users.io/request-1';
const url2='https://echo-yaakov-belch.c9users.io/request-2';
const url3='https://echo-yaakov-belch.c9users.io/request-3';

/* This is **not** how node.js does I/O (but see the next example...):
let res1=get(url1); console.log(res1);
let res2=get(url2); console.log(res2);
let res3=get(url3); console.log(res3);
*/

//*
console.log(url1);
http.get(url1, function(res) { console.log(res.headers.date); });
http.get(url2, function(res) { console.log(res.headers.date); });
http.get(url3, function(res) { console.log(res.headers.date); });
console.log('sent all requests');
//*/

/*
http.get(url1, (res1)=> {
  console.log(res1.headers.date);
  http.get(url2, (res2)=> {
    console.log(res2.headers.date);
    http.get(url3, (res3)=> {
      console.log(res3.headers.date);
      console.log('received all responses');
    });
  });
});
//*/

/*
http.get(url1, (res1)=>{
  res1.on('data',(buffer)=>console.log(buffer.toString()));
  res1.on('end', ()=> console.log('... Received all data.'));
});
//*/