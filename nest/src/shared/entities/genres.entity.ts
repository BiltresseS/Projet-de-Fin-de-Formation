import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { LifetimeEntity } from "./lifetime.entity"
import { TestsEntity } from "./test.entity"

@Entity("genres")
export class GenresEntity extends LifetimeEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 16, unique : true, nullable : false})
    name : string

    @ManyToMany(() => TestsEntity, tests => tests.genres, { cascade : ["insert", "update"]})
    tests : TestsEntity[]
}