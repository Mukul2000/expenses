import { ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Category } from "./Category"

const { Entity, Column, CreateDateColumn, PrimaryColumn } = require('typeorm')

@Entity() 
export class Expense {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length:'30'})
    name: string

    @Column()
    amount: number

    @Column({length: '300', nullable: true})
    description: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Category)
    category: Category

    @ManyToOne(() => User)
    created_by: User

}