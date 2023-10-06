import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
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

  @BelongsTo(() => Users, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'users'
  })
  users: Users;
}
