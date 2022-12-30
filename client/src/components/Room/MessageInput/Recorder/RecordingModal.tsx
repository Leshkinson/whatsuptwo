import useStore from '../../../../hooks/useStore'
import {BaseSyntheticEvent, useRef, useState} from 'react'
import {BsFillPauseFill, BsFillPlayFill, BsFillStopFill} from 'react-icons/bs'
import {
    audioConstraints,
    isRecordingStarted,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording,
    videoConstraints
} from '../../../../utils/recording'

type Video = {
    audio: {
        echoCancellation: boolean;
        autoGainControl: boolean;
        noiseSuppression: boolean;
    },
    video: {
        width: number;
        height: number;
        frameRate: number;
    }
}
type Audio = {
    audio: {
        echoCancellation: boolean;
        autoGainControl: boolean;
        noiseSuppression: boolean;
    }
}
type JoinType = Video & Audio
export default function RecordingModal({setShowModal}: any) {
    // извлекаем метод для обновления файла из хранилища
    const setFile: any = useStore(({setFile}: any) => setFile)
    // локальное состояние для требований к потоку данных
    // по умолчанию создается аудиозапись
    const [constraints, setConstraints]: [JoinType, any] = useState(videoConstraints)
    // локальный индикатор начала записи
    const [recording, setRecording] = useState(false)
    // иммутабельная ссылка на элемент для выбора типа записи
    const selectBlockRef = useRef<HTMLDivElement>(null)
    // иммутабельная ссылка на элемент `video`
    const videoRef = useRef<HTMLVideoElement>(null)

    // функция для обновления требований к потоку на основе типа записи
    const onChange = ({target: {value}}: any) =>
        value === 'video'
            ? setConstraints(videoConstraints)
            : setConstraints(audioConstraints)

    // функция для приостановки/продолжения записи
    const pauseResume = () => {
        if (recording) {
            pauseRecording()
        } else {
            resumeRecording()
        }
        setRecording(!recording)
    }

    // функция для начала записи
    const start = async () => {
        if (isRecordingStarted()) {
            return pauseResume()
        }

        // получаем поток
        const stream = await startRecording(constraints)

        // обновляем локальный индикатор начала записи
        setRecording(true)

        // скрываем элемент для выбора типа записи
        if (selectBlockRef.current) {
            selectBlockRef.current.style.display = 'none'
        }

        // если создается видеозапись
        if (constraints.video && stream) {
            if (videoRef.current) {
                videoRef.current.style.display = 'block'
                // направляем поток в элемент `video`
                videoRef.current.srcObject = stream
            }
        }
    }

    // функция для завершения записи
    const stop = () => {
        // получаем файл
        const file = stopRecording()

        // обновляем локальный индикатор начала записи
        setRecording(false)

        // обновляем файл
        setFile(file)

        // скрываем модалку
        setShowModal(false)
    }

    return (
        <div
            className='overlay'
            onClick={(event: BaseSyntheticEvent) => {
                // скрываем окно при клике за его пределами
                if (event.target.className !== 'overlay') return
                setShowModal(false)
            }}

        >
            <div className='modal'>
                <div ref={selectBlockRef}>
                    <h2>Select type</h2>
                    <select onChange={onChange}>
                        <option value='audio'>Audio</option>
                        <option value='video'>Video</option>
                    </select>
                </div>

                {/* вот для чего нам нужны 2 индикатора начала записи */}
                {isRecordingStarted() && <p>{recording ? 'Recording...' : 'Paused'}</p>}

                <video ref={videoRef} autoPlay muted/>

                <div className='controls'>
                    <button className='btn play' onClick={start}>
                        {recording ? (
                            <BsFillPauseFill className='icon'/>
                        ) : (
                            <BsFillPlayFill className='icon'/>
                        )}
                    </button>
                    {isRecordingStarted() && (
                        <button className='btn stop' onClick={stop}>
                            <BsFillStopFill className='icon'/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}