import { Model } from 'sequelize-typescript';
export default class Users extends Model<Users> {
    toJSON(): Users;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    countryCode: string;
    profilePicture: string;
    homeAddress: string;
    userType: string;
    city: string;
    state: string;
    status: string;
    validId: string;
    income: string;
    schoolName: string;
    matricNo: string;
    natureOfBusiness: string;
    roleInCompany: string;
    registrationNo: string;
    companyLocation: string;
    role: string;
}
