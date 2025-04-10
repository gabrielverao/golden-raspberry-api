import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IntervalsResponseDto } from './dto/intervals-response.dto';
import { GetProducersAwardIntervalsUseCase } from 'src/application/use-cases/get-producers-award-intervals.use-case';

@ApiTags('Producers')
@Controller('producers')
export class IntervalsController {
    constructor(
        private readonly getAwardIntervalsUseCase: GetProducersAwardIntervalsUseCase,
    ) { }

    @Get('intervals')
    @ApiOperation({ summary: 'Get producers with min and max award intervals' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: IntervalsResponseDto,
    })
    async getIntervals(): Promise<IntervalsResponseDto> {
        const result = await this.getAwardIntervalsUseCase.execute();
        return {
            min: result.min,
            max: result.max,
        };
    }
}
