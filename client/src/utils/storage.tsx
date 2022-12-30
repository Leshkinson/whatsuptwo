interface Value {
    //id: number;
    nickName: string;
    roomId: string;
}

export const storage = {
    get: (key: string): object | null => {
        if (key) {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }

        return null;
    },
    set: (key: string, value: Value): void => window.localStorage.setItem(key, JSON.stringify(value))
}

