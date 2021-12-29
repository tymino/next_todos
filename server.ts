// const next = require('next');
import next from 'next';

// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';


const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  const app = require('express')();
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  io.on('connect', (socket: any) => {
    socket.emit('now', { message: 'server Next test' });

    socket.on('test', (data: any) => {
      io.emit('test', data);

      const strTest = 'QQ' + data;
      // socket.broadcast.emit('test', strTest);
    })
  });

  app.get('*', (req: any, res: any) => {
    return nextHandler(req, res);
  });

  server.listen(PORT, () => {
    console.log('Ready server.');
  });
});
