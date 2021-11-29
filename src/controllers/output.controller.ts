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
import {Output} from '../models';
import {OutputRepository} from '../repositories';

export class OutputController {
  constructor(
    @repository(OutputRepository)
    public outputRepository : OutputRepository,
  ) {}

  @post('/outputs')
  @response(200, {
    description: 'Output model instance',
    content: {'application/json': {schema: getModelSchemaRef(Output)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {
            title: 'NewOutput',
            exclude: ['id'],
          }),
        },
      },
    })
    output: Omit<Output, 'id'>,
  ): Promise<Output> {
    return this.outputRepository.create(output);
  }

  @get('/outputs/count')
  @response(200, {
    description: 'Output model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Output) where?: Where<Output>,
  ): Promise<Count> {
    return this.outputRepository.count(where);
  }

  @get('/outputs')
  @response(200, {
    description: 'Array of Output model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Output, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Output) filter?: Filter<Output>,
  ): Promise<Output[]> {
    return this.outputRepository.find(filter);
  }

  @patch('/outputs')
  @response(200, {
    description: 'Output PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {partial: true}),
        },
      },
    })
    output: Output,
    @param.where(Output) where?: Where<Output>,
  ): Promise<Count> {
    return this.outputRepository.updateAll(output, where);
  }

  @get('/outputs/{id}')
  @response(200, {
    description: 'Output model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Output, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Output, {exclude: 'where'}) filter?: FilterExcludingWhere<Output>
  ): Promise<Output> {
    return this.outputRepository.findById(id, filter);
  }

  @patch('/outputs/{id}')
  @response(204, {
    description: 'Output PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {partial: true}),
        },
      },
    })
    output: Output,
  ): Promise<void> {
    await this.outputRepository.updateById(id, output);
  }

  @put('/outputs/{id}')
  @response(204, {
    description: 'Output PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() output: Output,
  ): Promise<void> {
    await this.outputRepository.replaceById(id, output);
  }

  @del('/outputs/{id}')
  @response(204, {
    description: 'Output DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.outputRepository.deleteById(id);
  }
}
