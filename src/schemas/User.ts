import { Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

const { Entity } = require('typeorm')

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    email: String

    @Column({unique: true, nullable: false})
    username: string

    @CreateDateColumn()
    created_at: Date

}