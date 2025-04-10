import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { ProducerEntity } from './entities/producer.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            entities: [MovieEntity, ProducerEntity],
            synchronize: true,
            logging: false,
        }),
        TypeOrmModule.forFeature([MovieEntity, ProducerEntity]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
