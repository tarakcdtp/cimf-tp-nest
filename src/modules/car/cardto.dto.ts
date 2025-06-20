import { IsString, IsInt, IsIn, Matches } from 'class-validator';

export class CardtoDto {
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
    message: 'brand can only contain letters and spaces',
     })
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
