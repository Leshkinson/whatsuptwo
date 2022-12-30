import {unlink} from 'fs/promises'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
//import onError from './onError.js'

export class FileService {

// путь к текущей директории
    getDirname() {
        return dirname(fileURLToPath(import.meta.url))
    }

// путь к директории с файлами
    getFileDir() {
        return join(this.getDirname(), '../files')
    }

// утилита для получения пути к файлу
    getFilePath(filePath: string) {
        return join(this.getFileDir(), filePath)
    }

// утилита для удаления файла
    async removeFile(filePath: string) {
        try {
            await unlink(this.getFilePath(filePath))
        } catch (e) {
            console.log(e)
        }
    }

}