import {MessageRepository} from "../../repositories/message-repository";
import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {MessageEntity} from "../../entity/message.entity";

export default function messageHandlers(io: Server, socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    //console.log('socket', socket)
    console.log('socket.data.roomId', socket.data.roomId)
    const roomId = socket.id;
    console.log('roomId',roomId)
    const messageRepository = new MessageRepository()

    function updateMessageList(roomId: string, messages: MessageEntity[] | MessageEntity){
        io.to(roomId).emit('message_list:update', messages)
    }

    socket.on('message:get', async () => {
        try {
            const messages: MessageEntity[] = await messageRepository.findByRoomId(roomId);
            updateMessageList(roomId, messages);
        } catch (e) {
            console.log(e)
        }
    })

    socket.on('message:add', async(message: MessageEntity) => {
        const messages = await messageRepository.create(message)
        updateMessageList(roomId, messages);
    })

    socket.on('message:remove', async (message: MessageEntity) => {
        const { messageId, messageType } = message

        const deleteResult = await messageRepository.deleteOne(messageId);

        if (messageType !== 'text'){
            //TODO change this to relation
          // removeFile(textOrPathToFile)
        }

        const messages: MessageEntity[] = await messageRepository.findByRoomId(roomId);
        updateMessageList(roomId, messages);
    })
}