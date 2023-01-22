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
  tableName: 'paystack_account',
})
export default class Paystack extends Model<Paystack> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  customerCode: string;
}
