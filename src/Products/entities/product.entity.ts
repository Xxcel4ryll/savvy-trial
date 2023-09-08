import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import ProductTypes from './product_type.entity';
// import ProductPrice from './product_price.entity';
import ProductImages from './product_images.entity';
import ProductSpecs from './product_specification.entity';
import UserFavourite from 'src/Users/entities/user_favourite.entity';
import ProductAccessory from './product_accessories.entity';

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

  // Associations for Product Type
  @BelongsTo(() => ProductTypes, {
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE'
  })
  productTypes: ProductTypes;

  @ForeignKey(() => ProductTypes)
  @Column({
    allowNull: false,
  })
  productTypeId: string;

  // Associations with Product Images
  @HasMany(() => ProductImages, {
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE'
  })
  images: ProductImages[];

  // Associations with Product Specification
  @HasMany(() => ProductSpecs, {
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE'
  })
  specifications: ProductSpecs[];

  // Associations with Favourite Product
  @HasOne(() => UserFavourite, {
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE'
  })
  userFavourite: UserFavourite;

  @HasMany(() => ProductAccessory, {
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE'
  })
  accessories: ProductAccessory[];
  
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  get price(): string{
    return this.getDataValue('price')?.toLocaleString();
  }

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    allowNull: false,
  })
  quantity: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  overview: string

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['NEW', 'USED'],
  })
  label: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  mainImage: string
}
