import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import ProductTypes from './product_type.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'products',
})
export default class Product extends Model<Product> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isVisible: boolean;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['RENT', 'BUY'],
  })
  salesOption: string;

  @BelongsTo(() => ProductTypes, 'productTypeId')
  productTypes: ProductTypes;

  @ForeignKey(() => ProductTypes)
  @Column({
    allowNull: false,
  })
  productTypeId: string;
}
