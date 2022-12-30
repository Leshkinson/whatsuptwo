import {postgresDataBase} from "../index";
import {MessageEntity} from "../entity/message.entity";
import {Repository} from "typeorm/repository/Repository";
import {DeleteResult} from "typeorm/query-builder/result/DeleteResult";

export class MessageRepository {
    private messageTable: Repository<MessageEntity>;

    constructor() {
        this.messageTable = postgresDataBase.getRepository(MessageEntity);
    }

    async findByRoomId(roomId: string): Promise<MessageEntity[]> {
        return this.messageTable.find({where: {roomId: roomId}});
    }

    async create(message: MessageEntity): Promise<MessageEntity> {
        return this.messageTable.create(message);
    }

    async deleteOne(messageId: number): Promise<DeleteResult> {
        return this.messageTable.delete({messageId: messageId});
    }

    //
    // async findByLink(link: string): Promise<UserEntity | null> {
    //     return this.userTable.findOneBy({activationLink: link});
    // }
    //
    // async createUser(userData: CreateUserDto): Promise<UserEntity> {
    //     return this.userTable.save(userData);
    // }
    //
    // async updateUser(userData: UserEntity): Promise<UserEntity> {
    //     return this.userTable.save(userData);
    // }

}