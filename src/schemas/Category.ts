import { ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

const { Entity, Column, CreateDateColumn, PrimaryColumn } = require('typeorm')

@Entity() 
export class Category {

    @PrimaryColumn({ length: '30', unique: true })
    name: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => User)
    created_by: User
}