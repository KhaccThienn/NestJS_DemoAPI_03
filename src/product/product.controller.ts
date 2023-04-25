import {
  Controller,
  Req,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  Logger,
  ParseFilePipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
// @UseGuards(AuthGuard('authh'))
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private logger = new Logger();

  isNum = (data: any) => {
    return typeof data == 'number';
  };

  @Get()
  async getAll(@Req() req: Request): Promise<Product[]> {
    const builder = this.productService
      .queryBuilder('product')
      .innerJoinAndSelect('product.cate', 'cate');
    // this.logger.log(builder.getQuery());

    if (req.query.s) {
      builder.andWhere(`product.name LIKE '%${req.query.s}%'`);
      this.logger.log(builder.getQuery());
    }

    if (req.query.sort) {
      const sort = req.query.sort;
      const sortArr = sort.toString().split('-');
      builder.orderBy(
        `product.${sortArr[0]}`,
        sortArr[1] == 'ASC' ? 'ASC' : 'DESC',
      );
      this.logger.log(builder.getQuery());
    }

    if (req.query.cate || this.isNum(req.query.cate)) {
      const cateID = req.query.cate;
      builder.andWhere(`cate.id = ${cateID}`);
      this.logger.log(builder.getQuery());
    }

    if (req.query.price) {
      const priceSort = req.query.price;
      const priceArr = priceSort.toString().split('-');
      const start = priceArr[0] ? priceArr[0] : 0;
      const end = priceArr[1] ? priceArr[1] : 100000000;
      builder.where(`product.price BETWEEN ${start} AND ${end}`);
      this.logger.log(builder.getQuery());
    }

    const page: number = parseInt(req.query.page as any) || 1;
    const perPage: number = parseInt(req.query.limit as any) || 8;

    builder.offset((page - 1) * perPage).limit(perPage);

    // this.logger.log(builder.getQuery());
    return await builder.getMany();
  }

  @Post(':cateID')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(
            new HttpException('Invalid File Type', HttpStatus.BAD_REQUEST),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: './src/public/uploads',
        filename(req, file, callback) {
          const dateNow = Date.now();
          const fileName = dateNow + file.originalname;
          const replaceFileName = fileName.replace(' ', '_');
          const fullPath =
            'http://' + req.get('host') + '/uploads/' + replaceFileName;
          console.log(fullPath);

          callback(null, fullPath);
        },
      }),
    }),
  )
  async postData(
    @Param('cateID') cateID: number,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
    @Body() data: CreateProductDTO,
  ): Promise<Product> {
    data.image = image.filename;
    return await this.productService.create(cateID, data);
  }

  @Put(':id/:cateID')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(
            new HttpException('Invalid File Type', HttpStatus.BAD_REQUEST),
            false,
          );
        }
      },
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
  async updateData(
    @Param('id') id: number,
    @Param('cateID') cateID: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() data: UpdateProductDTO,
  ): Promise<UpdateResult> {
    const currentData = await this.productService.getByID(id);
    let fileName = currentData.image;
    if (image) {
      fileName = image.filename;
    }
    data.image = fileName;
    return this.productService.update(id, cateID, data);
  }

  @Delete(':id')
  deleteProd(@Param('id') id: number) {
    return this.productService.deleteData(id);
  }
}
