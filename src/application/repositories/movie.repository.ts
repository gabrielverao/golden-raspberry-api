import { Movie } from "src/domain/entities/movie.entity";

export interface MovieRepository {
    save(movie: Movie): Promise<void>;
    findAllWinners(): Promise<Movie[]>;
    hasAny(): Promise<boolean>;
}
