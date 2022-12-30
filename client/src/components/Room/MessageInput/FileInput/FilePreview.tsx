import useStore from "../../../../hooks/useStore";
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'


const TYPES = {
    image: "image",
    audio: "audio",
    video: "video"
} as const

type TypeKeys = keyof typeof TYPES;
export type TypeValue = typeof TYPES[TypeKeys];
export type ArrayType = [TypeValue | undefined, Dispatch<SetStateAction<TypeValue | undefined>>]


export default function FilePreview() {

    // извлекаем файл и метод для его обновления из хранилища
    const { file, setFile }:  any = useStore(({ file, setFile } : any) => ({ file, setFile }))
    // локальное состояние для источника файла
    const [src, setSrc] = useState()
    // локальное состояние для типа файла
    const [type, setType]: ArrayType = useState()

    // при наличии файла обновляем источник и тип файла
    useEffect(() => {
        if (file) {
            // @ts-ignore
            setSrc(URL.createObjectURL(file))
            setType(file.type.split('/')[0])
        }
    }, [file])

    // элемент для рендеринга зависит от типа файла
    let element

    switch (type) {
        case 'image':
            element = <img src={src} alt={file.name} />
            break
        case 'audio':
            element = <audio src={src} controls/>
            break
        case 'video':
            element = <video src={src} controls/>
            break
        default:
            element = null
            break
    }

    return (
        <div className='container preview'>
            {element}

            <button
                type='button'
                className='btn close'
                // обнуляем файл при закрытии превью
                onClick={() => setFile(null)}
            >
                <AiOutlineClose className='icon close' />
            </button>
        </div>
    )
}