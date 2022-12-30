import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {UserDto} from "../dto/user-dto";
import {MailerService} from './mail-service';
import {TokenService} from "./token-service";
import {TokenMapper} from "../dto/mapper/token-mapper";
import {UserRepository} from "../repositories/user-repository";


export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    private readonly userRepository: UserRepository;

    async registration(email: string, password: string, nickName: string) {
        const applicant = await this.userRepository.findByEmail(email);
        if (applicant) {
            throw new Error('User with this email address already exists')
        }
        const activationLink = uuidv4();
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await this.userRepository.createUser({
            email: email,
            password: hashPassword,
            nickName: nickName,
            activationLink: activationLink,
        });
        const tokenService = new TokenService();
        const token = tokenService.generateToken(TokenMapper.prepareEntity(user));
        await tokenService.saveToken(user.id, token);

        const mailService = new MailerService();
        await mailService.sendNotificationToEmail(email, `${process.env.API_URL}api/activated/${activationLink}`);

        return {token, user: UserDto};
    }

    async registrationByGoogle(email: string, nickName: string) {
        const applicant = await this.userRepository.findByEmail(email);
        if (applicant) {
            throw new Error('User with this email address already exists')
        }

        const user = await this.userRepository.createUser({
            email: email,
            password: null,
            nickName: nickName,
            activationLink: null,
            isActivated: true,
        });
        const tokenService = new TokenService();
        const token = tokenService.generateToken(TokenMapper.prepareEntity(user));
        await tokenService.saveToken(user.id, token);

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
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User undefined')
        }

        if (typeof user.password !== "string") {
            throw new Error('Password is null')
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw new Error('Password incorrect')
        }

        const tokenService = new TokenService();
        const token = tokenService.generateToken(TokenMapper.prepareEntity(user));
        await tokenService.saveToken(user.id, token);

        return token;
    }

    async loginByGoogle(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User undefined')
        }

        const tokenService = new TokenService();
        const token = tokenService.generateToken(TokenMapper.prepareEntity(user));
        await tokenService.saveToken(user.id, token);

        return token;
    }

    static async logout(token: string) {
        const deletedToken = new TokenService();

        return await deletedToken.removeToken(token);
    }
}