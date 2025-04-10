import { Injectable, Inject } from '@nestjs/common';
import { MovieRepository } from '../repositories/movie.repository';
import { Movie } from 'src/domain/entities/movie.entity';

@Injectable()
export class ImportMoviesFromCsvUseCase {
    constructor(
        @Inject('MovieRepository')
        private readonly movieRepository: MovieRepository,
    ) { }

    async execute(movies: Movie[]): Promise<void> {
        for (const movie of movies) {
            await this.movieRepository.save(movie);
        }
    }
}
