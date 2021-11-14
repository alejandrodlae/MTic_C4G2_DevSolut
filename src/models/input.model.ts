import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class Input extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity_in: number;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<Input>) {
    super(data);
  }
}

export interface InputRelations {
  // describe navigational properties here
}

export type InputWithRelations = Input & InputRelations;
