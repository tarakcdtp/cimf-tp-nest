import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('voiture')
export class CarEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    color: string;
}
