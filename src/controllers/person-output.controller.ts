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
  Person,
  Output,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonOutputController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/outputs', {
    responses: {
      '200': {
        description: 'Array of Person has many Output',
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
    return this.personRepository.outputs(id).find(filter);
  }

  @post('/people/{id}/outputs', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Output)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Output, {
            title: 'NewOutputInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) output: Omit<Output, 'id'>,
  ): Promise<Output> {
    return this.personRepository.outputs(id).create(output);
  }

  @patch('/people/{id}/outputs', {
    responses: {
      '200': {
        description: 'Person.Output PATCH success count',
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
    return this.personRepository.outputs(id).patch(output, where);
  }

  @del('/people/{id}/outputs', {
    responses: {
      '200': {
        description: 'Person.Output DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Output)) where?: Where<Output>,
  ): Promise<Count> {
    return this.personRepository.outputs(id).delete(where);
  }
}
