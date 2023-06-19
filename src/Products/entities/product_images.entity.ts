import { Table, Column, Model, DataType, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import UserFavourite from 'src/Users/entities/user_favourite.entity';
import Products from './product.entity';

@Table({
  timestamps: false,
  underscored: true,
  tableName: 'product_images',
})
export default class ProductImages extends Model<ProductImages> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @BelongsTo(() => Products)
  products: Products;
}
