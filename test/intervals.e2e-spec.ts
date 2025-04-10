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

        const body = response.body;

        // Verifica estrutura geral da resposta
        expect(body).toHaveProperty('min');
        expect(body).toHaveProperty('max');
        expect(Array.isArray(body.min)).toBe(true);
        expect(Array.isArray(body.max)).toBe(true);

        // Validação dos campos de cada item de min
        for (const item of body.min) {
            expect(item).toHaveProperty('producer');
            expect(item).toHaveProperty('interval');
            expect(item).toHaveProperty('previousWin');
            expect(item).toHaveProperty('followingWin');

            expect(typeof item.producer).toBe('string');
            expect(typeof item.interval).toBe('number');
            expect(typeof item.previousWin).toBe('number');
            expect(typeof item.followingWin).toBe('number');
            expect(item.followingWin).toBeGreaterThan(item.previousWin);
        }

        // Validação dos campos de cada item de max
        for (const item of body.max) {
            expect(item).toHaveProperty('producer');
            expect(item).toHaveProperty('interval');
            expect(item).toHaveProperty('previousWin');
            expect(item).toHaveProperty('followingWin');

            expect(typeof item.producer).toBe('string');
            expect(typeof item.interval).toBe('number');
            expect(typeof item.previousWin).toBe('number');
            expect(typeof item.followingWin).toBe('number');
            expect(item.followingWin).toBeGreaterThan(item.previousWin);
        }

        // Dados finais esperados
        expect(body.min).toContainEqual({
            producer: 'Joel Silver',
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
        });

        expect(body.max).toContainEqual({
            producer: 'Matthew Vaughn',
            interval: 13,
            previousWin: 2002,
            followingWin: 2015,
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
