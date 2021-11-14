import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Input,
  Product,
} from '../models';
import {InputRepository} from '../repositories';

export class InputProductController {
  constructor(
    @repository(InputRepository)
    public inputRepository: InputRepository,
  ) { }

  @get('/inputs/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to Input',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof Input.prototype.id,
  ): Promise<Product> {
    return this.inputRepository.product(id);
  }
}
