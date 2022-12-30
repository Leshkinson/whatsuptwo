import {TokenEntity} from "./token.entity";
import {MessageEntity} from "./message.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";


@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({type: 'character varying' || 'integer', nullable: true})
    password: string | null;

    @Column({type: 'varchar', unique: true, nullable: true})
    nickName: string ;

    @Column({type: 'character varying' || 'integer', nullable: true})
    activationLink: string | null;

    @Column({default: false})
    isActivated: boolean;

    @Column({default: new Date(), type: "timestamptz"})
    createdAt: Date;

    @Column({type: 'varchar', unique: true, default: null})
    roomId: string | null;

    @OneToMany('TokenEntity', (token: TokenEntity) => token.user)
    tokens: TokenEntity[];

    @OneToMany('MessageEntity', (message: MessageEntity) => message.user)
    messages: MessageEntity[];

}