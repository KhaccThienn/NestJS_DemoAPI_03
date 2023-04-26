import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import Category from './category/entity/category.entity';
import { Product } from './product/entity/product.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entity';
import { AuthModule } from './auth/auth.module';
import { JWTStrategy } from './auth/strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sotatek_demonest_03',
      autoLoadEntities: false,
      entities: [Category, Product, User],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CategoryModule,
    ProductModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JWTStrategy],
})
export class AppModule {}
