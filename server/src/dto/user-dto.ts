interface Model {
    id: number,
    email: string,
    //password: string,
    isActivated: boolean,
}

export class UserDto {
    id: number;
    email: string;
    isActivated: boolean;

    constructor(model: Model) {
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}