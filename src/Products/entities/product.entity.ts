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

  @BelongsTo(() => ProductTypes)
  productTypes: ProductTypes;

  @ForeignKey(() => ProductTypes)
  @Column({
    allowNull: false,
  })
  productTypeId: string;

  // Associations for Product Images
  @HasMany(() => ProductImages)
  images: ProductImages[];


  // Associations for Product Specification
  @HasMany(() => ProductSpecs)
  specifications: ProductSpecs[];

  // Associations for Product Type
  @HasOne(() => ProductTypes)
  productType: ProductTypes;
  
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string
}
