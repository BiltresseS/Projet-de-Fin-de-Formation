import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LifetimeEntity } from "./lifetime.entity";
import { TestsEntity } from "./test.entity";
import { RanksEntity } from "./rank.entity";

@Entity("users")
export class UsersEntity extends LifetimeEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        type: "blob",
        transformer: {
          to: (value: string) => Buffer.from(value, "base64"),
          from: (value: Buffer) => value.toString("base64")
        }
    })
    avatar : string

    @Column({length : 16, nullable : false, unique : true})
    login : string

    @Column({length : 50, nullable : false, unique : true})
    mail : string

    @Column({length : 1400, nullable : false})
    mdp : string

    @Column({length : 1024, default : "Aucune bio"})
    bio : string

    @ManyToOne(() => RanksEntity, rank => rank.users, {cascade : ["insert", "update"]})
    @JoinColumn()
    rank : RanksEntity

    @OneToMany(() => TestsEntity, test => test.author, { cascade : ["insert", "update"]})
    tests : TestsEntity[]

    @ManyToMany(() => TestsEntity, tests => tests.upVotes, { cascade : ["insert", "update"]})
    @JoinColumn()
    testsUpVotes : TestsEntity[]
}