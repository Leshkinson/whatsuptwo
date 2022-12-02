import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import {MailerService} from './mail-service';
import {TokenService} from "./token-service";
import {UserDto} from "../dto/user-dto";
import {UserRepository} from "../repositories/user-repository";
import {TokenMapper} from "../dto/mapper/token-mapper";

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    private readonly userRepository: UserRepository;

    async registration(email: string, password: string) {
        // const userRepository = new UserRepository()
        const applicant = await this.userRepository.findByEmail(email)
        //const applicant = await postgresDataBase.getRepository(UserEntity).findOneBy({email: email})
        if (applicant) {
            throw new Error('User with this email address already exists')
        }

        const activationLink = uuidv4();
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await this.userRepository.createUser({
            email: email,
            password: hashPassword,
            activationLink: activationLink
        });

        const creatorToken = new TokenService()
        const token = creatorToken.generateToken(TokenMapper.prepareEntity(user));
        await creatorToken.saveToken(user.id, token);

        await MailerService.sendNotificationToEmail(email, `${process.env.API_URL}api/activated/${activationLink}`);

        return {token, user: UserDto};
    }

    async activated(activationLink: string) {
        const user = await this.userRepository.findByLink(activationLink);
        if (!user) {
            throw new Error("User undefined")
        }

        user.isActivated = true;
        await this.userRepository.updateUser(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email)
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