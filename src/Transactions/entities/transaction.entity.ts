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
  tableName: 'transactions',
})
export default class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  senderId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  transactionReference: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  senderType: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  receiverId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  receiverType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM,
    values: ['DEBIT', 'CREDIT'],
    allowNull: false,
  })
  txType: string;

  @Column({
    type: DataType.ENUM,
    values: ['APPROVED', 'PENDING'],
    defaultValue: 'APPROVED',
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.ENUM,
    values: ['DEPOSIT', 'TRANSFER', 'WITHDRAWAL', 'RENT'],
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.ENUM,
    values: ['CARD', 'WALLET', 'TRANSFER'],
    allowNull: false,
    defaultValue: 'WALLET',
  })
  medium: string;
}
