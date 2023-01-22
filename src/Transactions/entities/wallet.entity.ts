import {
  Table,
  Column,
  Model,
  DataType,
  // AfterCreate,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'wallets',
})
export default class Wallet extends Model<Wallet> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  userType: string;

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  bankId: string;

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  bankName: string;

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  accountName: string;

  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  medium: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  accountNumber: string;
}
