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
  paranoid: true,
  tableName: 'users',
})
export default class Users extends Model<Users> {
  toJSON() {
    const values = super.toJSON();
    if (values.password) {
      delete values.password;
    }
    return values;
  }

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
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    // set(value) {
    //   if (value) {
    //     this.setDataValue('password', 'nope');
    //   }
    // },
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  countryCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  homeAddress: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userType: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: ['SUSPENDED', 'VERIFIED', 'PENDING'],
    defaultValue: 'VERIFIED',
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  validId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  income: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  schoolName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  matricNo: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  natureOfBusiness: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  roleInCompany: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  registrationNo: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  companyLocation: string;

  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      return this.getDataValue('userType');
    },
    set(value) {
      this.setDataValue('role', value);
    },
  })
  role: string;

  // @AfterCreate
  // static removePassword(instance: Users) {
  //   instance = instance.toJSON();
  //   delete instance.password;
  // }
}
