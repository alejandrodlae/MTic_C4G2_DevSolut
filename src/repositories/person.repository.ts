import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Person, PersonRelations, Output} from '../models';
import {OutputRepository} from './output.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly outputs: HasManyRepositoryFactory<Output, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OutputRepository') protected outputRepositoryGetter: Getter<OutputRepository>,
  ) {
    super(Person, dataSource);
    this.outputs = this.createHasManyRepositoryFactoryFor('outputs', outputRepositoryGetter,);
    this.registerInclusionResolver('outputs', this.outputs.inclusionResolver);
  }
}
