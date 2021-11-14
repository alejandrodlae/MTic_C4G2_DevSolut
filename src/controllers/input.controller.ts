import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Input} from '../models';
import {InputRepository} from '../repositories';

export class InputController {
  constructor(
    @repository(InputRepository)
    public inputRepository : InputRepository,
  ) {}

  @post('/inputs')
  @response(200, {
    description: 'Input model instance',
    content: {'application/json': {schema: getModelSchemaRef(Input)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {
            title: 'NewInput',
            exclude: ['id'],
          }),
        },
      },
    })
    input: Omit<Input, 'id'>,
  ): Promise<Input> {
    return this.inputRepository.create(input);
  }

  @get('/inputs/count')
  @response(200, {
    description: 'Input model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Input) where?: Where<Input>,
  ): Promise<Count> {
    return this.inputRepository.count(where);
  }

  @get('/inputs')
  @response(200, {
    description: 'Array of Input model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Input, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Input) filter?: Filter<Input>,
  ): Promise<Input[]> {
    return this.inputRepository.find(filter);
  }

  @patch('/inputs')
  @response(200, {
    description: 'Input PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {partial: true}),
        },
      },
    })
    input: Input,
    @param.where(Input) where?: Where<Input>,
  ): Promise<Count> {
    return this.inputRepository.updateAll(input, where);
  }

  @get('/inputs/{id}')
  @response(200, {
    description: 'Input model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Input, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Input, {exclude: 'where'}) filter?: FilterExcludingWhere<Input>
  ): Promise<Input> {
    return this.inputRepository.findById(id, filter);
  }

  @patch('/inputs/{id}')
  @response(204, {
    description: 'Input PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Input, {partial: true}),
        },
      },
    })
    input: Input,
  ): Promise<void> {
    await this.inputRepository.updateById(id, input);
  }

  @put('/inputs/{id}')
  @response(204, {
    description: 'Input PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() input: Input,
  ): Promise<void> {
    await this.inputRepository.replaceById(id, input);
  }

  @del('/inputs/{id}')
  @response(204, {
    description: 'Input DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inputRepository.deleteById(id);
  }
}
