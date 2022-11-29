import jwt, {SignOptions} from 'jsonwebtoken';
import {authConfigService} from '../config/config.service';
import {TokenEntity} from '../entity/token.entity';
import {postgresDataBase} from "../config/app-data-base";


export class TokenService {

    private readonly secret: string
    private readonly options: SignOptions

    constructor() {
        const authConfig = authConfigService.getAuthConfig()
        this.secret = authConfig.secret
        this.options = authConfig.signOptions
    }

    generateToken(payload:object):string {
        return jwt.sign(payload, this.secret, this.options )

    }

    async saveToken(id: number, token: string){
        const tokenData = await postgresDataBase.getRepository(TokenEntity).findOneById(id)
        if (tokenData) {
            return await postgresDataBase.getRepository(TokenEntity).save({token: token})
        }
        return await postgresDataBase.getRepository(TokenEntity).save({token: token});
    }

}