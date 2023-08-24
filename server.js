const express = require('express');
const {createServer} = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    const io = require('socket.io')(httpServer);

    io.on('connection', socket => {
        console.log('Un client s\'est connecté');

        socket.on('userRegister', () => {
            console.log('userRegister côté serveur');
            socket.broadcast.emit('userRegister');
        });

        socket.on('disconnect', () => {
            console.log('Un client s\'est déconnecté');
        });
    });

    server.all('*', (req, res) => handle(req, res));

    httpServer.listen(PORT, err => {
        if (err) throw err;
        console.log(`Serveur prêt sur : http://localhost:${PORT}`);
    });
});
