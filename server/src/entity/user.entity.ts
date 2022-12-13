import {TokenEntity} from "./token.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";


@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    email: string;

    @Column({ type: 'character varying' || 'integer', nullable: true })
    password: string | null;

    @Column({ type: 'character varying' || 'integer', nullable: true })
    activationLink: string | null;

    @Column({default: false})
    isActivated: boolean;

    @Column({default: new Date(), type: "timestamptz"})
    createdAt: Date;

    @OneToMany('TokenEntity',(token: TokenEntity) => token.user)
    tokens: TokenEntity[];

}