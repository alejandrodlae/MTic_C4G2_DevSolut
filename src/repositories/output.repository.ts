import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Output, OutputRelations, Person, Product} from '../models';
import {PersonRepository} from './person.repository';
import {ProductRepository} from './product.repository';

export class OutputRepository extends DefaultCrudRepository<
  Output,
  typeof Output.prototype.id,
  OutputRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof Output.prototype.id>;

  public readonly product: BelongsToAccessor<Product, typeof Output.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Output, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
