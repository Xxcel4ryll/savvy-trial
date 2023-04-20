import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import Products from './product.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'product_types',
})
export default class ProductTypes extends Model<ProductTypes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.UUID,
  })
  productId: string;
  @ForeignKey(() => Products)

  @BelongsTo(() => Products, 'productId')
  productTypes: Products[];

  @HasMany(() => Products)
  products: Products[];
}
