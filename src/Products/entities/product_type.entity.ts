import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
}
