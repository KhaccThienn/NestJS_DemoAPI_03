/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'username',
    })
    username: string;

    @Column({
        type: 'varchar',
        name: 'password'
    })
    password: string;
}
