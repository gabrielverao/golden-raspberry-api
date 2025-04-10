import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('producers')
export class ProducerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => MovieEntity, (movie) => movie.producers)
    movies: MovieEntity[];
}
