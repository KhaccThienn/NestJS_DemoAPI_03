import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Request } from 'express';
import Category from './entity/category.entity';
import CreateCategoryDTO from './dto/create-category.dto';
import UpdateCategoryDTO from './dto/update-category.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}



  @Get()
  public getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  public getProdByCate(@Param('id') id: number): Promise<Category[]> {
    return this.categoryService.getProdByCate(id);
  }

  @Post()
  public addCategory(@Body() category: CreateCategoryDTO): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  public updateCategory(
    @Param('id') id: number,
    @Body() category: UpdateCategoryDTO,
  ): Promise<UpdateResult> {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  public removeCategory(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoryService.deleteCate(id);
  }
}
