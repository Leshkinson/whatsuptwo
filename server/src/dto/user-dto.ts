interface Model {
    id: number,
    email: string,
    //password: string,
    isActivated: boolean,
}

export class UserDto {
    id;
    email;
    //password;
    isActivated;

    constructor(model: Model) {
        this.id = model.id;
        this.email = model.email;
        //this.password = model.password;
        this.isActivated = model.isActivated;

    }
}