import { Injectable, Inject } from '@nestjs/common';
import { MovieRepository } from '../repositories/movie.repository';
import { IntervalResult, IntervalService } from 'src/domain/services/interval.service';

@Injectable()
export class GetProducersAwardIntervalsUseCase {
    constructor(
        @Inject('MovieRepository')
        private readonly movieRepository: MovieRepository,
    ) { }

    async execute(): Promise<IntervalResult> {
        const winnerMovies = await this.movieRepository.findAllWinners();
        return IntervalService.calculateIntervals(winnerMovies);
    }
}
