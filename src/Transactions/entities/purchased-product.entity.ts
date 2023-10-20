import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Product from 'src/Products/entities/product.entity';
import Users from 'src/Users/entities/user.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'purchased_products',
})
export default class PurchasedProduct extends Model<PurchasedProduct> {
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
  transactionId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentType: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM,
    values: ['confirmed', 'shipped', 'processing'],
    defaultValue: 'processing',
    allowNull: false,
  })
  status: string;

  @BelongsTo(() => Product, {
    foreignKey: 'product_id',
    targetKey: 'id',
    as: 'products'
  })
  products: Product;

  @BelongsTo(() => Users, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'users'
  })
  users: Users;
}
