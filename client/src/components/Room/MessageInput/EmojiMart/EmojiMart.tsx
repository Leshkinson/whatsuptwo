import React from 'react';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
//import 'emoji-mart/css/emoji-mart.css'
import useStore from '../../../../hooks/useStore'
import {useCallback, useEffect} from 'react'
import { BsEmojiSmile } from 'react-icons/bs'

export default function EmojiMart({ setText, messageInput }: any):  JSX.Element {
    // извлекаем соответствующие методы из хранилища
    const { showEmoji, setShowEmoji, setShowPreview }: any = useStore(
        ({ showEmoji, setShowEmoji, setShowPreview }: any) => ({
            showEmoji,
            setShowEmoji,
            setShowPreview
        })
    )
    const onKeydown = useCallback(
        (event:KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowEmoji(false)
            }
        },
        [setShowEmoji]
    )

    // регистрируем данный обработчик на объекте `window`
    useEffect(() => {
        window.addEventListener('keydown', onKeydown)

        return () => {
            window.removeEventListener('keydown', onKeydown)
        }
    }, [onKeydown])

    // метод для добавления эмодзи к тексту сообщения
    const onSelect = (native : string) => {
        setText((text: string) => text + native)
        messageInput.focus()
    }

    return (
        <div className='container emoji'>
            <button
                className='btn'
                type='button'
                /* отображаем/скрываем эмодзи при нажатии кнопки */
                onClick={() => setShowEmoji(!showEmoji)}
                disabled={setShowPreview}
            >
                <BsEmojiSmile className='icon' />
            </button>
            {showEmoji && <Picker
                    data={data}
                    onSelect={onSelect}
                    emojiSize={20}
                    showPreview={false}
                    perLine={6}
                />
            }
        </div>
    )
}