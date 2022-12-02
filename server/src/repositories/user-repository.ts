import {UserEntity} from "../entity/user.entity";
import {postgresDataBase} from '../index'
import {Repository} from "typeorm/repository/Repository";
import {CreateUserDto} from "../dto/user-dto";

export class UserRepository {
    private postgresDataBase: Repository<UserEntity>;

    constructor() {
        this.postgresDataBase = postgresDataBase.getRepository(UserEntity);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.postgresDataBase.findOneBy({email: email});
    }

    async findByLink(link: string): Promise<UserEntity | null> {
        return this.postgresDataBase.findOneBy({activationLink: link});
    }

    async createUser(userData: CreateUserDto): Promise<UserEntity> {
        return this.postgresDataBase.save(userData);
    }

    async updateUser(userData: UserEntity): Promise<UserEntity> {
        return this.postgresDataBase.save(userData);
    }

    async saveDataIntoDataBase(data: object) {
        await this.postgresDataBase.save(data)
    }
}
