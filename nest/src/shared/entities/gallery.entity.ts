import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { LifetimeEntity } from "./lifetime.entity"
import { TestId } from "../dto/_tests/testId.dto"
import { TestEntity } from "./test.entity"

@Entity("gallery")
export class GalleryEntity extends LifetimeEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({
        type: "mediumblob",
        transformer: {
          to: (value: string) => Buffer.from(value, "base64"),
          from: (value: Buffer) => value.toString("base64")
        }
    })
    file : string

    @Column({length : 256})
    commentaire : string

    @Column({length : 256})
    uploader : string

    @ManyToOne(() => TestEntity, test => test.gallery, { cascade : ["insert", "update"]})
    @JoinColumn()
    test : TestId
}