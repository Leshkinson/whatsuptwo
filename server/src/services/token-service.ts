import jwt, {Secret, SignOptions} from "jsonwebtoken";
import {TokenEntity} from "../entity/token.entity";
import {authConfigService} from "../config/config.service";
import {TokenRepository} from "../repositories/token-repository";

export class TokenService {

    private readonly secret: Secret;
    private readonly options: SignOptions;
    private tokenRepository: TokenRepository;

    constructor() {
        const authConfig = authConfigService.getAuthConfig();
        this.tokenRepository = new TokenRepository();
        this.options = authConfig.signOptions;
        this.secret = authConfig.secret;
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secret, this.options);
    }

    async findToken(token: string) {
        return this.tokenRepository.findByToken(token);
    }

    async saveToken(userId: number, token: string) {
        const tokenData = await this.tokenRepository.findByToken(token)
        if (tokenData) {
            return await this.tokenRepository.rewriteToken({
                token: token,
                userId: userId,
            })
        }

        return await this.tokenRepository.createToken({
            token: token,
            userId: userId,
        });
    }

    async removeToken(token: string) {
        const removeToken: TokenEntity | null = await this.tokenRepository.findByToken(token);
        if (!removeToken) {
            throw new Error('Token not find')
        }

        return await this.tokenRepository.deleteToken({token: token});
    }

    async validateToken(token: string) {
        try{
            return jwt.verify(token, authConfigService.getAuthSecret());
        } catch (e) {
            return null
        }
    }
}