import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TopicEntity } from './topic.entity';

@Entity('TODO')
export class TodoEntity {
    @PrimaryGeneratedColumn({ name: 'TODO_ID' })
    private todoId: number;

    @Column({ name: 'TITLE' })
    private title: string;

    @Column({ name: 'DESCRIPTION', nullable: true })
    private description: string;

    @Column({ name: 'IS_COMPLETED', default: false })
    private isCompleted: boolean;

    @CreateDateColumn({ name: 'CREATED_AT' })
    private createdAt: Date;

    @UpdateDateColumn({ name: 'UPDATED_AT' })
    private updatedAt: Date;

    @ManyToOne(() => TopicEntity, (topic) => topic.todos)
    public topic: TopicEntity;

    // Constructor
    constructor(title?: string, description?: string, isCompleted?: boolean, topic?: TopicEntity) {
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted || false;
        this.topic = topic;
    }

    // Getters and Setters
    public getTodoId(): number {
        return this.todoId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getIsCompleted(): boolean {
        return this.isCompleted;
    }

    public setIsCompleted(isCompleted: boolean): void {
        this.isCompleted = isCompleted;
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

    public getTopic(): TopicEntity {
        return this.topic;
    }

    public setTopic(topic: TopicEntity): void {
        this.topic = topic;
    }
}
