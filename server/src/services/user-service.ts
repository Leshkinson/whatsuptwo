import {postgresDataBase} from "../config/app-data-base";
import {UserEntity} from "../entity/user.entity";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'
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
        })
        await MailerService.sendNotificationToEmail(email, activationLink)// change activateLink
        const creatorToken = new TokenService()
        const userDto = new UserDto(user)
        const token = creatorToken.generateToken({...userDto})
        await creatorToken.saveToken(userDto.id, token)
        return {token, user: UserDto}
    }
}