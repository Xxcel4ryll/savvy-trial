import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'users_otp',
})
export default class UsersOTP extends Model<UsersOTP> {
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
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  secret: string;
}
