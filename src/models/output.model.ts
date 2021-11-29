import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Person} from './person.model';
import {Product} from './product.model';

@model()
export class Output extends Entity {
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
  quantity_out: number;

  @belongsTo(() => Person)
  personId: string;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<Output>) {
    super(data);
  }
}

export interface OutputRelations {
  // describe navigational properties here
}

export type OutputWithRelations = Output & OutputRelations;
