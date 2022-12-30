import {USER_KEY} from "../../constants";
//import {nanoid} from "nanoid";
import {FormEvent, useEffect, useState} from "react";
import {storage} from "../../utils/storage";

interface Target {
    target: {
        name: string,
        value: string
    }
}

export const NameInput = () => {
    const [formData, setFormData] = useState({
        nickName: '',
        roomId: "main_room"
    })
    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        const isSomeFieldEmpty = Object.values(formData).some((value: string) => !value.trim())
        setSubmitDisabled(isSomeFieldEmpty)
    }, [formData])

    const onChange = ({target: {name, value}}: Target) => {
        setFormData({...formData, [name]: value})
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (submitDisabled) return

        //const userId = nanoid()

        storage.set(USER_KEY, {
            nickName: formData.nickName,
            roomId: formData.roomId
        })

        window.location.reload()
    }
    return (
        <div className='container name-input'>
            <h2>Welcome</h2>
            <form onSubmit={onSubmit} className='form name-room'>
                <div>
                    <label htmlFor='nickName'>Enter your name</label>
                    <input
                        type='text'
                        id='nickName'
                        name='nickName'
                        minLength={2}
                        required
                        value={formData.nickName}
                        onChange={onChange}
                    />
                </div>
                {/* скрываем поле для создания комнаты (возможность масштабирования) */}
                <div className='visually-hidden'>
                    <label htmlFor='roomId'>Enter room ID</label>
                    <input
                        type='text'
                        id='roomId'
                        name='roomId'
                        minLength={4}
                        required
                        value={formData.roomId}
                        onChange={onChange}
                    />
                </div>
                <button disabled={submitDisabled} className='btn chat'>
                    Chat
                </button>
            </form>
        </div>
    )
}


