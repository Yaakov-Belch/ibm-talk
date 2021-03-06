"use strict";

const mqtt    = require('mqtt');
const client  = mqtt.connect('ws://mosca-yaakov-belch.c9users.io/');

const topic   = process.argv[2] || 'hello';
const message = process.argv[3] || 'message';

client.on('connect', function () {
  client.subscribe(topic);
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});