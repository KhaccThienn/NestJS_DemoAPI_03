import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import Category from './entity/category.entity';
import CreateCategoryDTO from './dto/create-category.dto';
import UpdateCategoryDTO from './dto/update-category.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  public getProdByCate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    return this.categoryService.getProdByCate(id);
  }

  @Post()
  public addCategory(@Body() category: CreateCategoryDTO): Promise<Category> {
    const validatedData = plainToClass(CreateCategoryDTO, category, {
      excludeExtraneousValues: true,
    });
    return this.categoryService.create(validatedData);
  }

  @Put(':id')
  public updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDTO,
  ): Promise<UpdateResult> {
    const validatedData = plainToClass(UpdateCategoryDTO, category, {
      excludeExtraneousValues: true,
    });
    return this.categoryService.update(id, validatedData);
  }

  @Delete(':id')
  public removeCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.categoryService.deleteCate(id);
  }
}
