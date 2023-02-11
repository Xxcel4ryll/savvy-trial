import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
}
