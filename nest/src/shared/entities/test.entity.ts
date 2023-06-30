import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LifetimeEntity } from "./lifetime.entity";
import { DeveloppersEntity } from "./developpers.entity";
import { DistributersEntity } from "./distributers.entity";
import { ConsolesEntity } from "./console.entity";
import { GenresEntity } from "./genres.entity";
import { GalleryEntity } from "./gallery.entity";
import { UpVoteEntity } from "./up-vote.entity";

@Entity("tests")
export class TestEntity extends LifetimeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 64, nullable: false })
  title: string

  @Column({
    type: "mediumblob",
    transformer: {
      to: (value: string) => Buffer.from(value, "base64"),
      from: (value: Buffer) => value.toString("base64")
    }
  })
  cover: string

  @ManyToMany(() => ConsolesEntity, consoles => consoles.tests, { cascade: ["insert", "update"] })
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
  consoles: ConsolesEntity[]

  @ManyToMany(() => GenresEntity, genres => genres.tests, { cascade: ["insert", "update"] })
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
  genres: GenresEntity[]

  @ManyToOne(() => DeveloppersEntity, developpers => developpers.tests, { cascade: ["insert", "update"] })
  @JoinColumn()
  developpeur: DeveloppersEntity

  @ManyToOne(() => DistributersEntity, distributers => distributers.tests, { cascade: ["insert", "update"] })
  @JoinColumn()
  distributeur: DistributersEntity

  @Column({ default: new Date().toLocaleString('fr-be', { timeZone: 'Europe/Brussels' }) })
  dateSortieJAP: string

  @Column({ default: new Date().toLocaleString('fr-be', { timeZone: 'Europe/Brussels' }) })
  dateSortieUS: string

  @Column({ default: new Date().toLocaleString('fr-be', { timeZone: 'Europe/Brussels' }) })
  dateSortiePAL: string

  @Column({ length: 2048, default: "En construction" })
  resume: string

  @Column({ length: 8192, nullable: false })
  test: string

  @Column({ nullable: false })
  note: number

  @Column({ nullable: false })
  author: string

  @OneToMany(() => UpVoteEntity, upVote => upVote.test)
  upVotes: UpVoteEntity[];

  @OneToMany(() => GalleryEntity, images => images.test, { cascade: ["insert", "update"] })
  gallery: GalleryEntity[]
}
