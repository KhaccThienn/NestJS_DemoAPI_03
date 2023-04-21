import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, HostAddress } from 'typeorm';
import { unlinkSync } from 'fs';
import { Product } from './entity/product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import Category from 'src/category/entity/category.entity';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private logger = new Logger();

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Prepare for the limit, paginator and filter data services
  queryBuilder(query: string) {
    return this.productRepository.createQueryBuilder(query);
  }

  getAllProd(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['cates'],
    });
  }

  getByID(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: [{ id: id }],
    });
  }

  getDetail(id: number, _slug = ''): Promise<Product[]> {
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
    const prod = await this.productRepository.find({
      where: [{ id: id }],
    });
    const filePath = prod[0].image;
    this.logger.log(filePath);
    unlinkSync('./src/public/uploads/' + filePath);
    return this.productRepository.delete(id);
  }
}
