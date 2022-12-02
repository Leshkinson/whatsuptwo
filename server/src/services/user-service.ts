import {postgresDataBase} from "../config/app-data-base";
import {UserEntity} from "../entity/user.entity";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import {MailerService} from './mail-service';
import {TokenService} from "./token-service";
import {UserDto} from "../dto/user-dto";

export class UserService {
    static async registration(email: string, password: string) {
        const applicant = await postgresDataBase.getRepository(UserEntity).findOneBy({email: email})
        if (applicant) {
            throw new Error('User with this email address already exists')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuidv4();
        const user = await postgresDataBase.getRepository(UserEntity).save({
            email: email,
            password: hashPassword,
            activationLink: activationLink
        });
        const creatorToken = new TokenService()
        await MailerService.sendNotificationToEmail(email, `${process.env.API_URL}api/activated/${activationLink}`);
        const userDto = new UserDto(user);
        const token = creatorToken.generateToken({...userDto});
        await creatorToken.saveToken(user.id, token);

        return {token, user: UserDto};
    }

    static async activated(activationLink: string) {
        const user = await postgresDataBase.getRepository(UserEntity).findOneBy({activationLink: activationLink})
        if (!user) {
            throw new Error("User undefined")
        }

        user.isActivated = true;
        await postgresDataBase.getRepository(UserEntity).save(user);
    }

    static async login(email: string, password: string) {
        const user = await postgresDataBase.getRepository(UserEntity).findOneBy({email: email})
        if (!user) {
            throw new Error('User undefined')
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw new Error('Password incorrect')
        }

        const userDto = new UserDto(user);
        const creatorToken = new TokenService();
        const token = creatorToken.generateToken({...userDto});
        await creatorToken.saveToken(user.id, token);

        return token;
    }

    static async logout(token: string) {
        const deletedToken = new TokenService();

        return await deletedToken.removeToken(token);
    }
}