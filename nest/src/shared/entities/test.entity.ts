import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LifetimeEntity } from "./lifetime.entity";
import { UsersEntity } from "./user.entity";
import { DeveloppersEntity } from "./developpers.entity";
import { DistributersEntity } from "./distributers.entity";
import { ConsolesEntity } from "./console.entity";
import { GenresEntity } from "./genres.entity";
import { GalleryEntity } from "./gallery.entity";

@Entity("tests")
export class TestsEntity extends LifetimeEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 64, nullable : false})
    title : string

    @Column({length : 256, default : "img"})
    cover : string

    @ManyToMany(() => ConsolesEntity, consoles => consoles.tests, { cascade : ["insert", "update"]})
    @JoinTable({
        name: 'tests_consoles',
        joinColumn: {
          name: 'test_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'console_id',
          referencedColumnName: 'id',
        }
    })
    consoles : ConsolesEntity[]

    @ManyToMany(() => GenresEntity, genres => genres.tests, { cascade : ["insert", "update"]})
    @JoinTable({
        name: 'tests_genres',
        joinColumn: {
          name: 'test_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'genre_id',
          referencedColumnName: 'id',
        }
    })
    genres : GenresEntity[]

    @ManyToOne(() => DeveloppersEntity, developpers => developpers.tests, { cascade : ["insert", "update"]})
    @JoinColumn()
    developpeur : DeveloppersEntity

    @ManyToOne(() => DistributersEntity, distributers => distributers.tests, { cascade : ["insert", "update"]})
    @JoinColumn()
    distributer : DistributersEntity

    @Column({default : new Date().toLocaleString('fr-be', {timeZone: 'Europe/Brussels'})})
    dateSortieJAP : string

    @Column({default : new Date().toLocaleString('fr-be', {timeZone: 'Europe/Brussels'})})
    dateSortieUS : string

    @Column({default : new Date().toLocaleString('fr-be', {timeZone: 'Europe/Brussels'})})
    dateSortiePAL : string

    @Column({length : 2048, default : "En construction"})
    resume : string

    @Column({length : 8192, nullable : false})
    test : string

    @Column({nullable : false})
    note : number

    @ManyToOne(() => UsersEntity, user => user.tests, { cascade : ["insert", "update"]})
    @JoinColumn()
    author : UsersEntity

    @ManyToMany(() => UsersEntity, users => users.testsUpVotes, { cascade : ["insert", "update"]})
    @JoinTable({
        name: 'tests_upvotes',
        joinColumn: {
          name: 'test_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        }
    })
    upVotes : UsersEntity[]

    @OneToMany(() => GalleryEntity, images => images.test, {cascade : ["insert", "update"]})
    gallery : GalleryEntity[]
}
