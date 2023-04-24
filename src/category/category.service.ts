import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './entity/category.entity';
import { DataSource, Repository, UpdateResult, DeleteResult } from 'typeorm';
import CreateCategoryDTO from './dto/create-category.dto';
import UpdateCategoryDTO from './dto/update-category.dto';
import { Product } from './../product/entity/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly cateRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.cateRepository.find({
      relations: ['prods'],
    });
  }

  async getProdByCate(cateId: number): Promise<Category> {
    return await this.cateRepository.findOne({
      relations: ['prods'],
      where: [{ id: cateId }],
    });
  }

  async checkIsUnique(value: any): Promise<Category> {
    return await this.cateRepository.findOne({
      where: [{ name: value }],
    });
  }

  async create(newCate: CreateCategoryDTO): Promise<Category> {
    const exts_cate = this.checkIsUnique(newCate.name);
    if (exts_cate) {
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
    const cate = await this.getProdByCate(id);
    cate[0].prods.forEach((e) => {
      this.productRepository.remove(e);
    });

    return this.cateRepository.delete(id);
  }
}
