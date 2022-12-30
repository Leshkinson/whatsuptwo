import {SERVER_URI} from '../constants'

const upload = async ({ file, roomId }: {file: any; roomId: string}) => {
    try {
        const body = new FormData()
        body.append('file', file)

        const response = await fetch(`${SERVER_URI}/upload`, {
            method: 'POST',
            body,
            headers: {
                'x-room-id': roomId
            }
        })

        if (!response.ok) return response

        return await response.json()
    } catch (e) {
        throw e
    }
}

const fileApi = { upload }

export default fileApi