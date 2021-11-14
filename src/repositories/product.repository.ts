import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, Input, Output} from '../models';
import {InputRepository} from './input.repository';
import {OutputRepository} from './output.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly inputs: HasManyRepositoryFactory<Input, typeof Product.prototype.id>;

  public readonly outputs: HasManyRepositoryFactory<Output, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InputRepository') protected inputRepositoryGetter: Getter<InputRepository>, @repository.getter('OutputRepository') protected outputRepositoryGetter: Getter<OutputRepository>,
  ) {
    super(Product, dataSource);
    this.outputs = this.createHasManyRepositoryFactoryFor('outputs', outputRepositoryGetter,);
    this.registerInclusionResolver('outputs', this.outputs.inclusionResolver);
    this.inputs = this.createHasManyRepositoryFactoryFor('inputs', inputRepositoryGetter,);
    this.registerInclusionResolver('inputs', this.inputs.inclusionResolver);
  }
}
