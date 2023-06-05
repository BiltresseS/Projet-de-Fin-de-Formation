import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class LifetimeEntity
{
    @CreateDateColumn()
    createdAt : Date
    
    @UpdateDateColumn()
    updatedAt : Date
    
    @DeleteDateColumn()
    deletedAt : Date

}