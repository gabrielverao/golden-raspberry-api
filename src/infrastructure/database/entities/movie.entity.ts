import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ProducerEntity } from './producer.entity';

@Entity('movies')
export class MovieEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column()
    title: string;

    @Column()
    studios: string;

    @Column({ default: false })
    winner: boolean;

    @ManyToMany(() => ProducerEntity, (producer) => producer.movies, {
        cascade: true,
    })
    @JoinTable({
        name: 'movies_producers',
        joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'producer_id', referencedColumnName: 'id' },
    })
    producers: ProducerEntity[];
}
