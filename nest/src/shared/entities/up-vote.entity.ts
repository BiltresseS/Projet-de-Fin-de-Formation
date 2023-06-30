import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { LifetimeEntity } from "./lifetime.entity"
import { TestEntity } from "./test.entity";

@Entity("upvotes")
export class UpVoteEntity extends LifetimeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string;

  @Column()
  testId: number;

  @ManyToOne(() => TestEntity)
  @JoinColumn({ name: 'testId' })
  test: TestEntity;
}
