import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { LifetimeEntity } from "./lifetime.entity"
import { TestsEntity } from "./test.entity"

@Entity("developpers")
export class DeveloppersEntity extends LifetimeEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 64, unique : true, nullable : false})
    name : string

    @OneToMany(() => TestsEntity, test => test.developpeur, { cascade : ["insert", "update"]})
    tests : TestsEntity[]
}