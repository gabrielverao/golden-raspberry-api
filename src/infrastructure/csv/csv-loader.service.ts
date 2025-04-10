import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { Movie } from 'src/domain/entities/movie.entity';
import { parseProducers } from 'src/shared/utils/producer-parser';

@Injectable()
export class CsvLoaderService {
    private readonly csvPath = path.resolve(__dirname, '../../../Movielist.csv');

    async loadMovies(): Promise<Movie[]> {
        return new Promise((resolve, reject) => {
            const movies: Movie[] = [];

            fs.createReadStream(this.csvPath)
                .pipe(csv({ separator: ';' }))
                .on('data', (row) => {
                    const producers = parseProducers(row.producers || '');
                    const movie = new Movie(
                        parseInt(row.year, 10),
                        row.title,
                        row.studios,
                        producers,
                        (row.winner || '').toLowerCase() === 'yes',
                    );
                    movies.push(movie);
                })
                .on('end', () => {
                    resolve(movies);
                })
                .on('error', (err) => {
                    reject(err);
                });

        });
    }
}
