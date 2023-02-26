import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'user_favourites',
})
export default class UserFavourite extends Model<UserFavourite> {
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
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
}
