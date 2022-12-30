import React, {useEffect, useRef} from 'react'
import MessageItem from './MessageItem'


interface Message {
    messageId: string;
    messageType: string;
    textOrPathToFile: string;
    roomId: string;
    userId: number;
    userName: string;
}

interface ParamsMessageList {
    log: string | null;
    messages: Message[];
    removeMessage: any
}

export default function MessageList({log, messages, removeMessage}: ParamsMessageList) {
    // иммутабельная ссылка на элемент для отображения системных сообщений
    const logRef = useRef<HTMLParagraphElement>(null)
    // иммутабельная ссылка на конец списка сообщений
    const bottomRef = useRef<HTMLParagraphElement>(null)

    // выполняем прокрутку к концу списка при добавлении нового сообщения
    // это может стать проблемой при большом количестве пользователей,
    // когда участники чата не будут успевать читать сообщения
    useEffect(() => {
            if (bottomRef.current) {
                bottomRef.current.scrollIntoView({
                    behavior: 'smooth'
                })
            }
    }, [messages])

    // отображаем и скрываем системные сообщения
    useEffect(() => {
        if (log) {
                if (logRef.current) {
                    logRef.current.style.opacity = String(0.8)
                    logRef.current.style.zIndex = String(1)

                    const timerId = setTimeout(() => {
                        if (logRef) {
                            if (logRef.current) {
                                logRef.current.style.opacity = String(0)
                                logRef.current.style.zIndex = String(-1)

                                clearTimeout(timerId)
                            }
                        }
                    }, 1500)
                }
        }
    }, [log])

    return (
        <div className='container message'>
            <h2>Messages</h2>
            <ul className='list message'>
                {messages.map((message: Message) => (
                    <MessageItem
                        key={message.messageId}
                        message={message}
                        removeMessage={removeMessage}
                    />
                ))}

                <p ref={bottomRef}/>

                <p ref={logRef} className='log'>
                    {log}
                </p>
            </ul>
        </div>
    )
}