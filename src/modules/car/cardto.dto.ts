import { IsString, IsInt, IsIn } from 'class-validator';

export class CardtoDto {
    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsInt()
    year: number;

    @IsIn(['red', 'blue', 'green'], {
    message: 'color must be one of the following values: red, blue, green',
    })
    color: 'red' | 'blue' | 'green';
}
