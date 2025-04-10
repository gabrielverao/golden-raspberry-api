import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { CsvLoaderService } from './infrastructure/csv/csv-loader.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { MovieRepositoryImpl } from './infrastructure/database/repositories/movie.repository.impl';
import { ImportMoviesFromCsvUseCase } from './application/use-cases/import-movies-from-csv.use-case';
import { GetProducersAwardIntervalsUseCase } from './application/use-cases/get-producers-award-intervals.use-case';
import { IntervalsController } from './api/intervals/intervals.controller';
import { MovieRepository } from './application/repositories/movie.repository';

@Module({
  controllers: [IntervalsController],
  imports: [DatabaseModule],
  providers: [
    CsvLoaderService,
    ImportMoviesFromCsvUseCase,
    GetProducersAwardIntervalsUseCase,
    {
      provide: 'MovieRepository',
      useClass: MovieRepositoryImpl,
    },
  ],
  exports: ['MovieRepository'],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly csvLoaderService: CsvLoaderService,
    private readonly importMoviesFromCsv: ImportMoviesFromCsvUseCase,
    @Inject('MovieRepository')
    private readonly movieRepository: MovieRepository,
  ) { }

  async onApplicationBootstrap() {
    const alreadyHasData = await this.movieRepository.hasAny();

    if (!alreadyHasData) {
      const movies = await this.csvLoaderService.loadMovies();
      await this.importMoviesFromCsv.execute(movies);
      console.log(`✅ ${movies.length} filmes importados para o banco`);
    } else {
      console.log('📁 Filmes já foram importados anteriormente. Pulando importação...');
    }
  }
}