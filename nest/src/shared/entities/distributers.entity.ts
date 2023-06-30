import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { LifetimeEntity } from "./lifetime.entity"
import { TestEntity } from "./test.entity"

@Entity("distributers")
export class DistributersEntity extends LifetimeEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 64, unique : true, nullable : false})
    name : string

    @OneToMany(() => TestEntity, test => test.distributeur, { cascade : ["insert", "update"]})
    tests : TestEntity[]
}