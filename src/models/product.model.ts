import {Entity, model, property, hasMany} from '@loopback/repository';
import {Output} from './output.model';
import {Input} from './input.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity_available: number;

  @property({
    type: 'string',
    required: true,
  })
  measurement_unit: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @hasMany(() => Output)
  outputs: Output[];

  @hasMany(() => Input)
  inputs: Input[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
