import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { LifetimeEntity } from "./lifetime.entity"
import { TestEntity } from "./test.entity"

@Entity("genres")
export class GenresEntity extends LifetimeEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 16, unique : true, nullable : false})
    name : string

    @ManyToMany(() => TestEntity, tests => tests.genres, { cascade : ["insert", "update"]})
    tests : TestEntity[]
}