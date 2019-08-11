const io = require('socket.io');
const Message = require('./models/message');

module.exports = (server) => {
  const socket = io(server);
  const users = [];
  const players = {};

const star = {
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50,
};
const scores = {
  blue: 0,
  red: 0,
};
  socket.on('connection', (instance) => {
    // create a new player and add it to our players object
    players[instance.id] = {
      rotation: 0,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      playerId: instance.id,
      team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };

    instance.emit('currentPlayers', players);
    instance.broadcast.emit('newPlayer', players[instance.id]);
    instance.on('playerMovement', (movementData) => {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      players[instance.id].rotation = movementData.rotation;
      socket.broadcast.emit('playerMoved', players[socket.id]);
    });
    instance.on('user', (user) => {
      users.push(user);
      instance.broadcast.emit('user', user);
      instance.emit('users_connected', users.length);
    });

    instance.on('message', (data) => {
      socket.send(JSON.stringify(data));
      return new Promise((resolve, reject) => {
        const msg = new Message({ auther: data.user, body: data.message, date: data.date });
        resolve(msg);
        reject(null);
      }).then((msg) => {
        msg.save((err) => {
          if (err) throw err;
          console.log('saved');
        });
      }).catch((err) => {
        if (err) throw err;
      });
    });

    instance.on('typing', (data) => {
      instance.broadcast.emit('typing', data);
    });
    instance.on('disconnect', (socket_) => {
      users.pop();
      instance.emit('users_connected', users.length);
    });
  });
};
