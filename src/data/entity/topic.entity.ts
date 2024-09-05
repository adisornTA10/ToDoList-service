import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity('TOPIC')
export class TopicEntity {
    @PrimaryGeneratedColumn({ name: 'TOPIC_ID' })
    private topicId: number;

    @Column({ name: 'NAME' })
    private name: string;

    @Column({ name: 'DETAIL', nullable: true })
    private detail: string;

    @OneToMany(() => TodoEntity, (todo) => todo.topic, { cascade: true })
    public todos: TodoEntity[];

    // Constructor
    constructor(name?: string, detail?: string) {
        this.name = name;
        this.detail = detail;
    }

    // Getters and Setters
    public getTopicId(): number {
        return this.topicId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDetail(): string {
        return this.detail;
    }

    public setDetail(detail: string): void {
        this.detail = detail;
    }

    public getTodos(): TodoEntity[] {
        return this.todos;
    }

    public setTodos(todos: TodoEntity[]): void {
        this.todos = todos;
    }
}
