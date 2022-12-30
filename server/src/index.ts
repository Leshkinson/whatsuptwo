import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import {Server} from "socket.io";
import {DataSource} from "typeorm";
import {createServer} from "http";
import bodyParser from "body-parser";
import {router} from "./router/router";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import {databaseConfigService} from "./config/config.service";

import onConnection from "./socket_io/onConection"

dotenv.config();

const app = express();
const httpServer = createServer(app);

// io.on('connection', function (socket) {
//     console.log('socket.id', socket.id)
//     console.log("WebSocket is life");
//     console.log("Rooms", socket.rooms);
//     socket.join('SecretRoom')
//     console.log("Rooms+1", socket.rooms);
//     const {roomId, userName} = socket.handshake.query
//     //socket.rooms = roomId
//     console.log('socket.handshake.query', socket.handshake.query)
//     console.log('Socket.Handshake',roomId, userName)
//
//
//         //socket.join(roomId)
//     socket.on('new message', (message) => {
//         socket.emit('new message', message)
//     })
//
//
//     socket.on('chat message', (msg: string) => {
//         console.log('message: ' + msg);
//     });
//     socket.on('chat message', (msg: string) => {
//         socket.emit('chat message', msg);
//     });
//
//     socket.on('disconnect', (roomId) => {
//         console.log('user disconnected');
//         socket.leave(roomId)
//     });
//
// });

export const postgresDataBase = new DataSource(databaseConfigService.getTypeOrmConfig());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys:['secret'],
    maxAge: 24 * 60 * 60 * 100
}))

// app.use(session({
//      secret: 'SECRET',
//      resave: false,
//      saveUninitialized: false,}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:2022/api/google', 'http://127.0.0.1:3000', 'http://127.0.0.1:2022/api/google'],
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
}));

postgresDataBase.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
    console.error("Error during Data Source initialization", err)
});

app.use('/', router);

const io = new Server(httpServer, {
    cors: {origin: 'http://localhost:3000'},
    serveClient: false
});

io.on('connection', (socket ) => {
    //console.log('SOCKET', socket)
    onConnection(io, socket)
})

const start = (): void => {
    const PORT = process.env.PORT || 3001;
    try {
        httpServer.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));
    } catch (error: any) {
        console.log(error.message)
    }
}

start();