import {Entity, model, property, hasMany} from '@loopback/repository';
import {Input} from './input.model';
import {Output} from './output.model';

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
    type: 'string',
    required: true,
  })
  measurement_unit: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity_available: number;

  @hasMany(() => Input)
  inputs: Input[];

  @hasMany(() => Output)
  outputs: Output[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
