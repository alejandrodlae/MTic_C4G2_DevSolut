import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, Output, Input} from '../models';
import {OutputRepository} from './output.repository';
import {InputRepository} from './input.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly outputs: HasManyRepositoryFactory<Output, typeof Product.prototype.id>;

  public readonly inputs: HasManyRepositoryFactory<Input, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OutputRepository') protected outputRepositoryGetter: Getter<OutputRepository>, @repository.getter('InputRepository') protected inputRepositoryGetter: Getter<InputRepository>,
  ) {
    super(Product, dataSource);
    this.inputs = this.createHasManyRepositoryFactoryFor('inputs', inputRepositoryGetter,);
    this.registerInclusionResolver('inputs', this.inputs.inclusionResolver);
    this.outputs = this.createHasManyRepositoryFactoryFor('outputs', outputRepositoryGetter,);
    this.registerInclusionResolver('outputs', this.outputs.inclusionResolver);
  }
}
