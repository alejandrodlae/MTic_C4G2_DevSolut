import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Output,
  Product,
} from '../models';
import {OutputRepository} from '../repositories';

export class OutputProductController {
  constructor(
    @repository(OutputRepository)
    public outputRepository: OutputRepository,
  ) { }

  @get('/outputs/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to Output',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof Output.prototype.id,
  ): Promise<Product> {
    return this.outputRepository.product(id);
  }
}
