import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Products from './product.entity';

@Table({
  timestamps: false,
  underscored: true,
  tableName: 'product_specification',
})
export default class ProductSpecification extends Model<ProductSpecification> {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  specifications: string;

  @BelongsTo(() => Products)
  products: Products;
}
