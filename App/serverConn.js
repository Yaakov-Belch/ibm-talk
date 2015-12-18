"use strict";

import mqtt from 'mqtt';

const client= mqtt.connect('ws://static-yaakov-belch.c9users.io/');

client.on('connect', function () {
  client.subscribe('qa/#');
});

export const serverConn= store => next => {
  console.log('initialize serverConn once');
  client.on('message', (topic, message)=>{
    console.log(message.toString());
    next(JSON.parse(message.toString()));
  });
  return action => {
    console.log(action);
    let {path} = action;
    if(path && !action.local) {
      let topic='qa/'+path.join('/');
      let message=JSON.stringify(action);
      client.publish(topic, message, {
        qos:1,retain:true
      });
    }
    next(action);
  };
}