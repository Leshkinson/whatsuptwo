import {postgresDataBase} from "../index";
import {CreateUserDto} from "../dto/user-dto";
import {UserEntity} from "../entity/user.entity";
import {Repository} from "typeorm/repository/Repository";

export class UserRepository {
    private userTable: Repository<UserEntity>;

    constructor() {
        this.userTable = postgresDataBase.getRepository(UserEntity);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userTable.findOneBy({email: email});
    }

    async findByLink(link: string): Promise<UserEntity | null> {
        return this.userTable.findOneBy({activationLink: link});
    }

    async findByNickName(nickName: string): Promise<UserEntity | null> {
        return this.userTable.findOneBy({nickName: nickName});
    }

    async createUser(userData: CreateUserDto): Promise<UserEntity> {
        return this.userTable.save(userData);
    }

    async updateUser(userData: UserEntity): Promise<UserEntity> {
        return this.userTable.save(userData);
    }
}
