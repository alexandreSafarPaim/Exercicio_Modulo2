import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import Category from './Category';

@Entity('transactions')
class Transactions{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column('decimal')
    value: number

    @Column()
    type: 'income'| 'outcome'
    
    @Column()
    category_id: string
    
    @ManyToOne(()=> Category)
    @JoinColumn({name: 'category_id'})
    category:Category
    
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
export default Transactions