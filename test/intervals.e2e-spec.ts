import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('IntervalsController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/producers/intervals (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/producers/intervals')
            .expect(200);

        expect(response.body).toHaveProperty('min');
        expect(response.body).toHaveProperty('max');

        expect(Array.isArray(response.body.min)).toBe(true);
        expect(Array.isArray(response.body.max)).toBe(true);

        for (const interval of response.body.min) {
            expect(interval).toHaveProperty('producer');
            expect(interval).toHaveProperty('interval');
            expect(interval).toHaveProperty('previousWin');
            expect(interval).toHaveProperty('followingWin');
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
