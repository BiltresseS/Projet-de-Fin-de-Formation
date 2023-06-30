import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { LifetimeEntity } from "./lifetime.entity";
import { TestEntity } from "./test.entity";

@Entity("consoles")
export class ConsolesEntity extends LifetimeEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 64, unique : true, nullable : false})
    name : string

    @ManyToMany(() => TestEntity, tests => tests.consoles, { cascade : ["insert", "update"]})
    @JoinColumn()
    tests : TestEntity[]
}