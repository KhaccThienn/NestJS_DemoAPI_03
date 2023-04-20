import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import Category from 'src/category/entity/category.entity';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Prepare for the limit, paginator and filter data services
  async queryBuilder(query: string) {
    return this.productRepository.createQueryBuilder(query);
  }

  async getAllProd(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['cates'],
    });
  }

  async getDetail(id: number, _slug = ''): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['cate'],
      where: [{ id: id }],
    });
  }

  async create(cateID: number, prod: CreateProductDTO): Promise<Product> {
    const cate = await this.categoryRepository.findOneBy({ id: cateID });
    if (!cate) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    const newProd = this.productRepository.create({
      ...prod,
      cate,
    });

    return this.productRepository.save(newProd);
  }

  async update(
    id: number,
    cateID: number,
    prod: UpdateProductDTO,
  ): Promise<UpdateResult> {
    const cate = await this.categoryRepository.findOneBy({ id: cateID });
    if (!cate) {
      throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
    }
    const newProd = this.productRepository.create({
      ...prod,
      cate,
    });
    return this.productRepository.update(id, newProd);
  }

  async deleteData(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
