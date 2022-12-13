import {postgresDataBase} from "../index";
import {CreateTokenDto} from "../dto/token-dto";
import {TokenEntity} from "../entity/token.entity";
import {DeleteResult, InsertResult} from "typeorm";
import {Repository} from "typeorm/repository/Repository";


export class TokenRepository {
    private tokenTable: Repository<TokenEntity>

    constructor() {
        this.tokenTable = postgresDataBase.getRepository(TokenEntity)
    }

    async findByToken(token: string): Promise<TokenEntity | null> {
        return this.tokenTable.findOneBy({token: token});
    }

    async createToken(tokenData: CreateTokenDto): Promise<TokenEntity> {
        return this.tokenTable.save(tokenData);
    }

    async rewriteToken(tokenData: CreateTokenDto): Promise<InsertResult> {
        return this.tokenTable.insert(tokenData);
    }

    async deleteToken(token: { token: string }): Promise<DeleteResult> {
        return this.tokenTable.delete(token);
    }
}