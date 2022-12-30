import userHandlers from './handlers/user.handlers.js'
import messageHandlers from './handlers/message.handlers.js'
import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export default function onConnection(io: Server, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    const roomId = socket.id

    socket.data.roomId = roomId
    //socket.data.nickName = nickName

    socket.join(roomId)

    userHandlers(io, socket)

    messageHandlers(io, socket)
}