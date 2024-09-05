import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('UM_PROFILE')
export class ProfileEntity {
    @PrimaryGeneratedColumn({ name: 'PROFILE_ID' })
    private profileId: number;

    @Column({ name: 'FIRST_NAME' })
    private firstName: string;

    @Column({ name: 'LAST_NAME' })
    private lastName: string;

    @Column({ name: 'AGE' })
    private age: number;

    @Column({ name: 'GENDER' })
    private gender: string;

    @Column({ name: 'ACTIVE' })
    private active: number;

    @CreateDateColumn({ name: 'CREATED_AT' })
    private createdAt: Date;

    @UpdateDateColumn({ name: 'UPDATED_AT' })
    private updatedAt: Date;

    // Constructor
    constructor(profileId?: number, firstName?: string, lastName?: string, age?: number, gender?: string, active?: number) {
        this.profileId = profileId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.active = active;
    }

    // Getters and Setters
    public getProfileId(): number {
        return this.profileId;
    }

    public setProfileId(profileId: number): void {
        this.profileId = profileId;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(age: number): void {
        this.age = age;
    }

    public getGender(): string {
        return this.gender;
    }

    public setGender(gender: string): void {
        this.gender = gender;
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
}
