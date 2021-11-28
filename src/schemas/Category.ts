import { ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

const { Entity, Column, CreateDateColumn, PrimaryColumn } = require('typeorm')

@Entity() 
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: '30' })
    name: string

    @ManyToOne(() => User)
    created_by: User
}