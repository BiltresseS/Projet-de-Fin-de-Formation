import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { LifetimeEntity } from "./lifetime.entity";
import { TestsEntity } from "./test.entity";

@Entity("consoles")
export class ConsolesEntity extends LifetimeEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 64, unique : true, nullable : false})
    name : string

    @ManyToMany(() => TestsEntity, tests => tests.consoles, { cascade : ["insert", "update"]})
    @JoinColumn()
    tests : TestsEntity[]
}