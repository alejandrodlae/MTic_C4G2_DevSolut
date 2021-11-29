import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Input, InputRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class InputRepository extends DefaultCrudRepository<
  Input,
  typeof Input.prototype.id,
  InputRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof Input.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Input, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
