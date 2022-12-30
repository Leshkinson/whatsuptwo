import {UserEntity} from "./user.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "message"})
export class MessageEntity {
    @PrimaryGeneratedColumn()
    messageId: number;

    @Column()
    messageType: string;

    @Column()
    textOrPathToFile: string;

    @Column()
    roomId: string;


    @Column({name: "user_id", nullable: false})
    userId: number;

    @ManyToOne(() => UserEntity, user => user.messages, {cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "user_id"})

    user: UserEntity;

}