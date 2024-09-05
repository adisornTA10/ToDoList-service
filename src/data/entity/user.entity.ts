import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('UM_USER')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'USER_ID'})
  private userId: number;

  @Column({ name: 'USERNAME', unique: true })
  username: string;

  @Column({ name: 'PASSWORD_HASH' })
  private passwordHash: string;
  
  @Column({ name: 'ACTIVE' })
  private active: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  private createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  private updatedAt: Date;

  @OneToOne(() => ProfileEntity, { eager: true })
  @JoinColumn({ name: 'PROFILE_ID', referencedColumnName: 'profileId' })
  private profileEntity: ProfileEntity;

  // Constructor
  constructor(userId?: number, username?: string, passwordHash?: string, active?: number, profileEntity?: ProfileEntity) {
    this.userId = userId;
    this.username = username;
    this.passwordHash = passwordHash;
    this.active = active;
    this.profileEntity = profileEntity;
  }

  // Getters and Setters
  public getUserId(): number {
    return this.userId;
  }

  public setUserId(userId: number): void {
    this.userId = userId;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  public setPasswordHash(passwordHash: string): void {
    this.passwordHash = passwordHash;
  }

  public getActive(): number {
    return this.active;
  }

  public setActive(active: number): void {
    this.active = active;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public getProfileEntity(): ProfileEntity {
    return this.profileEntity;
  }

  public setProfileEntity(profileEntity: ProfileEntity): void {
    this.profileEntity = profileEntity;
  }
}
