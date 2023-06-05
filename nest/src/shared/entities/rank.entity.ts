import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LifetimeEntity } from "./lifetime.entity";
import { UsersEntity } from "./user.entity";

@Entity("ranks")
export class RanksEntity extends LifetimeEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 32, nullable : false, unique : true})
    rank : string

    @OneToMany(() => UsersEntity, user => user.rank, {cascade : ["insert", "update"]})
    @JoinColumn()
    users : UsersEntity[]
}