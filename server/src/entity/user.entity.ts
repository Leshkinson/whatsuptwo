import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TokenEntity} from "./token.entity";

@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    activationLink: string;

    @Column({default: false})
    isActivated: boolean;

    @Column({default: new Date(), type: "timestamptz"})
    createdAt: Date;

    @OneToMany('TokenEntity',(token: TokenEntity) => token.user, {cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
    tokens: TokenEntity[];

    // addToken(token: TokenEntity) {
    //     if(this.tokens == null) {
    //         this.tokens = new Array<TokenEntity>();
    //     }
    //     this.tokens.push(token);
    // }

    //  add updatedAt
}