"use strict";

const http=require('http');

const url1='http://static-yaakov-belch.c9users.io/text1.txt';
const url2='http://static-yaakov-belch.c9users.io/text2.txt';
const url3='http://static-yaakov-belch.c9users.io/text3.txt';

/*
let res1=await get(url1);  console.log(res1);
let res2=await get(url2);  console.log(res2);
let res3=await get(url3);  console.log(res3);
//*/

/*
http.get(url1, function(res) { console.log(res.headers.etag); });
http.get(url2, function(res) { console.log(res.headers.etag); });
http.get(url3, function(res) { console.log(res.headers.etag); });
console.log('sent all requests');
//*/

/*
http.get(url1, (res1)=> {
  console.log(res1.headers.etag);
  http.get(url2, (res2)=> {
    console.log(res2.headers.etag);
    http.get(url3, (res3)=> {
      console.log(res3.headers.etag);
      console.log('received all responses');
    });
  });
});
//*/

//*
http.get(url1, (res1)=>{
  res1.on('data',(buffer)=>console.log(buffer.toString()));
  res1.on('end', ()=> console.log('... Received all data.'));
});
//*/