import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UM_USER')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'FIRST_NAME' })
  firstName: string;

  @Column({ name: 'LAST_NAME' })
  lastName: string;

  @Column({ name: 'USERNAME' , unique: true})
  username: string;

  @Column({ name: 'PASSWORD_HASH'})
  passwordHash: string;
  
}
