import { ApiProperty } from '@nestjs/swagger';

export class AwardIntervalDto {
    @ApiProperty()
    producer: string;

    @ApiProperty()
    interval: number;

    @ApiProperty()
    previousWin: number;

    @ApiProperty()
    followingWin: number;
}

export class IntervalsResponseDto {
    @ApiProperty({ type: [AwardIntervalDto] })
    min: AwardIntervalDto[];

    @ApiProperty({ type: [AwardIntervalDto] })
    max: AwardIntervalDto[];
}
