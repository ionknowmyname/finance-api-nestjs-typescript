/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Transaction')
export class Transaction {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phonenumber: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}