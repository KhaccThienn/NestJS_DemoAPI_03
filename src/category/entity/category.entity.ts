/* eslint-disable prettier/prettier */
import { Product } from 'src/product/entity/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'category',
})
export default class Category {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    name: string;

    @Column({
        type: 'tinyint',
        default: 1
    })
    status: number;

    @OneToMany(() => Product, (prod) => prod.cate)
    prods: Product[]
}
