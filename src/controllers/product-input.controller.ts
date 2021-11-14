import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Product,
  Input,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductInputController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/inputs', {
    responses: {
      '200': {
        description: 'Array of Product has many Input',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Input)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Input>,
  ): Promise<Input[]> {
    return this.productRepository.inputs(id).find(filter);
  }

  @post('/products/{id}/inputs', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Input)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {
            title: 'NewInputInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) input: Omit<Input, 'id'>,
  ): Promise<Input> {
    return this.productRepository.inputs(id).create(input);
  }

  @patch('/products/{id}/inputs', {
    responses: {
      '200': {
        description: 'Product.Input PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {partial: true}),
        },
      },
    })
    input: Partial<Input>,
    @param.query.object('where', getWhereSchemaFor(Input)) where?: Where<Input>,
  ): Promise<Count> {
    return this.productRepository.inputs(id).patch(input, where);
  }

  @del('/products/{id}/inputs', {
    responses: {
      '200': {
        description: 'Product.Input DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Input)) where?: Where<Input>,
  ): Promise<Count> {
    return this.productRepository.inputs(id).delete(where);
  }
}
