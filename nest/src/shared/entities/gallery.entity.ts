import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { LifetimeEntity } from "./lifetime.entity"
import { TestsEntity } from "./test.entity"
import { TestId } from "../dto/_tests/testId.dto"

@Entity("gallery")
export class GalleryEntity extends LifetimeEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 512})
    url : string

    @Column({length : 256})
    commentaire : string

    @ManyToOne(() => TestsEntity, test => test.gallery, { cascade : ["insert", "update"]})
    @JoinColumn()
    test : TestId
}