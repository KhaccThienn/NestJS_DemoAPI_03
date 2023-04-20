/* eslint-disable prettier/prettier */
import Category from 'src/category/entity/category.entity';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
@Entity({
  name: 'product',
})
export class Product {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: number;

  @Column({
    type: 'float',
    name: 'price',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'float',
    name: 'sale_price',
    nullable: true,
    default: 0,
  })
  sale_price: number;

  @Column({
    type: 'text',
    name: 'image',
    nullable: false,
  })
  image: string;

  @ManyToOne(() => Category, (cate) => cate.prods)
  cate: Category;
}
