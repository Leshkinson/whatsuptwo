import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {UserRepository} from "../../repositories/user-repository";
import {UserEntity} from "../../entity/user.entity";

export default function userHandlers(io: Server, socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    const roomId  = socket.id
    const nickName = 'oleg'
    const userRepository = new UserRepository();

    const updateUserList = (roomId: string, users: UserEntity[] | UserEntity ) => {
        io.to(roomId).emit('user_list:update', users)
    }

    socket.on('user:add', async () => {
        const user: UserEntity | null = await userRepository.findByNickName(nickName)
        if (user) {
            socket.to(roomId).emit('log', `User ${nickName} connected`)
            user.roomId = roomId
            console.log("USER.ROOMID", user.roomId)
            updateUserList(roomId, user)
        }

    })

    socket.on('disconnect', async () => {
        socket.to(roomId).emit('log', `User ${nickName} disconnected`)
        const user: UserEntity | null = await userRepository.findByNickName(nickName)
        if (user) {
            socket.leave(roomId)
            user.roomId = null
            updateUserList(roomId, user)
        }

    })
}