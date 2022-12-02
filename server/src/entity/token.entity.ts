import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity({name: "token"})
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({default: new Date(), type: "timestamptz"})
    createdAt: Date;

    @Column({name: "user_id", nullable: false})
    userId: number;

    //@Column({name: "user_id"})
    @ManyToOne(() => UserEntity, user => user.tokens)
    @JoinColumn({name: "user_id"})

    user: UserEntity;
}