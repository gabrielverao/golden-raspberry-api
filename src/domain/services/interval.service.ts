import { Movie } from "../entities/movie.entity";

export interface AwardInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface IntervalResult {
    min: AwardInterval[];
    max: AwardInterval[];
}

export class IntervalService {
    static calculateIntervals(movies: Movie[]): IntervalResult {
        const winnersByProducer: Map<string, number[]> = new Map();

        for (const movie of movies) {
            if (!movie.winner) continue;

            for (const producer of movie.producers) {
                const wins = winnersByProducer.get(producer) || [];
                wins.push(movie.year);
                winnersByProducer.set(producer, wins);
            }
        }

        const awardIntervals: AwardInterval[] = [];

        for (const [producer, years] of winnersByProducer.entries()) {
            if (years.length < 2) continue;

            const sortedYears = years.sort((a, b) => a - b);

            for (let i = 1; i < sortedYears.length; i++) {
                awardIntervals.push({
                    producer,
                    interval: sortedYears[i] - sortedYears[i - 1],
                    previousWin: sortedYears[i - 1],
                    followingWin: sortedYears[i],
                });
            }
        }

        const minInterval = Math.min(...awardIntervals.map(i => i.interval));
        const maxInterval = Math.max(...awardIntervals.map(i => i.interval));

        return {
            min: awardIntervals.filter(i => i.interval === minInterval),
            max: awardIntervals.filter(i => i.interval === maxInterval),
        };
    }
}
