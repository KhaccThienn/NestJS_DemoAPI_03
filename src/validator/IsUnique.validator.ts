/* eslint-disable prettier/prettier */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryService } from 'src/category/category.service';
import { ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: true })
export class UniqueConstraints implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    return this.categoryService.checkIsUnique(value).then((cate) => {
      if (cate) return false;
      return true;
    });
  }
}
export function IsUniqueCate(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueConstraints,
    });
  };
}
