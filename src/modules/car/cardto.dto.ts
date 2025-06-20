import { Type } from 'class-transformer';
import { IsString, IsInt, IsIn, Matches, Max, Min } from 'class-validator';

export class CardtoDto {
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
    message: 'brand can only contain letters and spaces',
     })
    brand: string;

    @IsString()
    model: string;

    @Type(() => Number)    // transforms input to number
    @IsInt()              // validates it’s an integer
    @Min(1900)            // minimum year allowed
    @Max(new Date().getFullYear())  // max current year
    year: number;

    @IsIn(['red', 'blue', 'green'])
    color: 'red' | 'blue' | 'green';
}
