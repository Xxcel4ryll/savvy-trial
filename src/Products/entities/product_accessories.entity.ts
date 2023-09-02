import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Products from './product.entity';

@Table({
  timestamps: false,
  underscored: true,
  tableName: 'product_accessories',
})
export default class ProductAccessory extends Model<ProductAccessory> {
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
  accessories: string;

  @BelongsTo(() => Products)
  products: Products;
}