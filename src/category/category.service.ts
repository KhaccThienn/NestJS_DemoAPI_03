import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './entity/category.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import CreateCategoryDTO from './dto/create-category.dto';
import UpdateCategoryDTO from './dto/update-category.dto';
import { Product } from './../product/entity/product.entity';
import { unlinkSync } from 'fs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly cateRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  private logger = new Logger();

  async getAll(): Promise<Category[]> {
    return await this.cateRepository.find({
      relations: ['prods'],
    });
  }

  async getProdByCate(cateId: number): Promise<Product[]> {
    const cate = await this.cateRepository.findOne({
      relations: ['prods'],
      where: [{ id: cateId }],
    });
    return cate.prods;
  }

  async checkIsUnique(value: any): Promise<Category> {
    return await this.cateRepository.findOne({
      where: [{ name: value }],
    });
  }

  async create(newCate: CreateCategoryDTO): Promise<Category> {
    const exts_cate = this.checkIsUnique(newCate.name);
    if (!exts_cate) {
      throw new HttpException(
        `Create category ${newCate.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.cateRepository.save(newCate);
  }

  async update(id: number, category: UpdateCategoryDTO): Promise<UpdateResult> {
    return await this.cateRepository.update(id, category);
  }

  async deleteCate(id: number): Promise<DeleteResult> {
    const prods = await this.getProdByCate(id);
    console.log(prods);

    prods.forEach((e) => {
      const filePath = e.image;
      this.logger.log(filePath);
      unlinkSync('./src/public/uploads/' + filePath);
      this.productRepository.remove(e);
    });

    return this.cateRepository.delete(id);
  }
}
