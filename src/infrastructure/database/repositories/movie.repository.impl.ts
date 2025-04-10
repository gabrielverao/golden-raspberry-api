import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { ProducerEntity } from '../entities/producer.entity';
import { MovieRepository } from 'src/application/repositories/movie.repository';
import { Movie } from 'src/domain/entities/movie.entity';

@Injectable()
export class MovieRepositoryImpl implements MovieRepository {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepo: Repository<MovieEntity>,

        @InjectRepository(ProducerEntity)
        private readonly producerRepo: Repository<ProducerEntity>,
    ) { }

    async save(movie: Movie): Promise<void> {
        const producerEntities = await Promise.all(
            movie.producers.map(async (name) => {
                let producer = await this.producerRepo.findOne({ where: { name } });
                if (!producer) {
                    producer = this.producerRepo.create({ name });
                    await this.producerRepo.save(producer);
                }
                return producer;
            }),
        );

        const movieEntity = this.movieRepo.create({
            year: movie.year,
            title: movie.title,
            studios: movie.studios,
            winner: movie.winner,
            producers: producerEntities,
        });

        await this.movieRepo.save(movieEntity);
    }

    async findAllWinners(): Promise<Movie[]> {
        const movies = await this.movieRepo.find({
            where: { winner: true },
            relations: ['producers'],
        });

        return movies.map((m) => {
            return new Movie(
                m.year,
                m.title,
                m.studios,
                m.producers.map((p) => p.name),
                m.winner,
            );
        });
    }

    async hasAny(): Promise<boolean> {
        const count = await this.movieRepo.count();
        return count > 0;
    }

}
