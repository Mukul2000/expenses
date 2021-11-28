import { Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

const { Entity } = require('typeorm')

@Entity()
export class User {

    @PrimaryColumn()
    email: String

    @Column({unique: true, nullable: false})
    username: string

    @Column()
    password: string

    token?: string

    @CreateDateColumn()
    created_at: Date

}