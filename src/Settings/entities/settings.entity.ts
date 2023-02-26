import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'faqs',
})
export class Faqs extends Model<Faqs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  heading: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

}


@Table({
  timestamps: true,
  underscored: true,
  tableName: 'terms_and_condition',
})
export class TermsAndCondition extends Model<TermsAndCondition> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  heading: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
}
