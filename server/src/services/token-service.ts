import jwt, {SignOptions} from 'jsonwebtoken';
import {authConfigService} from '../config/config.service';
import {TokenEntity} from '../entity/token.entity';
import {postgresDataBase} from "../index";


export class TokenService {

    private readonly secret: string
    private readonly options: SignOptions

    constructor() {
        const authConfig = authConfigService.getAuthConfig()
        this.secret = authConfig.secret
        this.options = authConfig.signOptions
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secret, this.options);
    }

    async findToken(token: string) {
        return await postgresDataBase.getRepository(TokenEntity).findOne({where: {token: token}});
    }

    async saveToken(userId: number, token: string) {
        const tokenData = await this.findToken(token)
        if (tokenData) {
            return await postgresDataBase.getRepository(TokenEntity).insert({
                token: token,
                userId: userId,
            })
        }

        return await postgresDataBase.getRepository(TokenEntity).save({
            token: token,
            userId: userId,
        });
    }

    async removeToken(token: string) {
        const removeToken: TokenEntity | null = await this.findToken(token)
        if (!removeToken) {
            throw new Error('Token not find')
        }

        return await postgresDataBase.getRepository(TokenEntity).delete({token: token});
    }
}