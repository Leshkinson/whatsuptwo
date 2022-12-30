import {io} from 'socket.io-client';
import {storage} from '../utils/storage';
import {SERVER_URI, USER_KEY} from '../constants';
import {useEffect, useRef, useState} from 'react';
import {User} from "../models/storage/user";

export default function useChat() {

    const user = storage.get(USER_KEY) as User;
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [log, setLog] = useState(null)
    const {current: socket} = useRef(
        io(SERVER_URI, {
            query: {
                roomId: user.roomId,
                nickName: user.nickName
            }
        })
    )

    useEffect(() => {
        // сообщаем о подключении нового пользователя
        socket.emit('user:add', user)

        // запрашиваем сообщения из БД
        socket.emit('message:get')

        // обрабатываем получение системного сообщения
        socket.on('log', (log) => {
            setLog(log)
        })

        // обрабатываем получение обновленного списка пользователей
        socket.on('user_list:update', (users) => {
            setUsers(users)
        })

        // обрабатываем получение обновленного списка сообщений
        socket.on('message_list:update', (messages) => {
            setMessages(messages)
        })
    }, [])


    const sendMessage = (message: string) => {
        socket.emit('message:add', message)
    }

    const removeMessage = (message: string): void => {
        socket.emit('message:remove', message)
    }

    return {users, messages, log, sendMessage, removeMessage}
}