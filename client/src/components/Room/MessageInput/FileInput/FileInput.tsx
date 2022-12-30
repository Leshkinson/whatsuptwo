import useStore from "../../../../hooks/useStore";
import {ChangeEvent, useEffect, useRef} from 'react'
import {MdAttachFile} from 'react-icons/md'
import FilePreview from '../FileInput/FilePreview'

export default function FileInput() {
    // извлекаем файл и метод для его обновления из хранилища
    const {file, setFile}: any = useStore(({file, setFile}: any) => ({file, setFile}))
    // иммутабельная ссылка на инпут для добавления файла
    // мы скрываем инпут за кнопкой
    const inputRef = useRef<HTMLInputElement>(null)

    // сбрасываем значение инпута при отсутствии файла
    useEffect(() => {
        if (!file) {
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }, [file])

    return (
        <div className='container file'>
            <input
                type='file'
                accept='image/*, audio/*, video/*'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files){
                        setFile(event.target.files[0])
                    }
                }
            }
                className='visually-hidden'
                ref={inputRef}

            />
            <button
                type='button'
                className='btn'
                // передаем клик инпуту
                onClick={() => {
                    if(inputRef.current){
                        inputRef.current.click()
                    }
                }
                }
            >
                <MdAttachFile className='icon'/>
            </button>

            {file && <FilePreview/>}
        </div>
    )
}