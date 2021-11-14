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
  Output,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOutputController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/outputs', {
    responses: {
      '200': {
        description: 'Array of Product has many Output',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Output)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Output>,
  ): Promise<Output[]> {
    return this.productRepository.outputs(id).find(filter);
  }

  @post('/products/{id}/outputs', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Output)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {
            title: 'NewOutputInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) output: Omit<Output, 'id'>,
  ): Promise<Output> {
    return this.productRepository.outputs(id).create(output);
  }

  @patch('/products/{id}/outputs', {
    responses: {
      '200': {
        description: 'Product.Output PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {partial: true}),
        },
      },
    })
    output: Partial<Output>,
    @param.query.object('where', getWhereSchemaFor(Output)) where?: Where<Output>,
  ): Promise<Count> {
    return this.productRepository.outputs(id).patch(output, where);
  }

  @del('/products/{id}/outputs', {
    responses: {
      '200': {
        description: 'Product.Output DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Output)) where?: Where<Output>,
  ): Promise<Count> {
    return this.productRepository.outputs(id).delete(where);
  }
}
