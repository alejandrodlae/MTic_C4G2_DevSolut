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
  Person,
} from '../models';
import {OutputRepository} from '../repositories';

export class OutputPersonController {
  constructor(
    @repository(OutputRepository)
    public outputRepository: OutputRepository,
  ) { }

  @get('/outputs/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Output',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Output.prototype.id,
  ): Promise<Person> {
    return this.outputRepository.person(id);
  }
}
