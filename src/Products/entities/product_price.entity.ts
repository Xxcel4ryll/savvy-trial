import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  underscored: true,
  tableName: 'product_prices',
})
export default class ProductPrices extends Model<ProductPrices> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.FLOAT,
    unique: true,
    allowNull: false,
  })
  price: number;
}
