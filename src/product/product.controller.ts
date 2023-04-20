import {
  Controller,
  HttpException,
  HttpStatus,
  Req,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Logger,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { Request } from 'express';
import CreateCategoryDTO from 'src/category/dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private logger = new Logger();

  @Get()
  async getAll(@Req() req: Request): Promise<Product[]> {
    const builder = await this.productService.queryBuilder('product');

    if (req.query.s) {
      builder.where('product.name LIKE :s', { s: req.query.s });
    }

    const page: number = parseInt(req.query.page as any) || 1;
    const perPage = 8;

    builder.offset((page - 1) * perPage).limit(perPage);

    return builder.getMany();
  }

  @Post(':cateID')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/public/uploads',
        filename(req, file, callback) {
          const dateNow = Date.now();
          const fileName = dateNow + file.originalname;
          callback(null, fileName);
        },
      }),
    }),
  )
  async postData(
    @Param('cateID') cateID: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateProductDTO,
  ): Promise<Product> {
    const objData = {
      ...data,
      image: image.filename,
    };
    return await this.productService.create(cateID, objData);
  }
}
