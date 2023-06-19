import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Sequelize
} from 'sequelize-typescript';
import Products from '../../Products/entities/product.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'user_favourites',
})
export default class UserFavourite extends Model<UserFavourite> {
  static isUserFavouriteQuery({userId, column}){
		const query = `(
      SELECT CASE WHEN EXISTS (
        SELECT user_id FROM user_favourites 
        WHERE ${this.tableName}.user_id = "${userId}" 
        AND ${this.tableName}.product_id = ${column}
        LIMIT 1
      )
      THEN TRUE
      ELSE FALSE END
      )`;
		return Sequelize.literal(query);
	}

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

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: string;

  @BelongsTo(() => Products)
  product: Products;
  
  
}
