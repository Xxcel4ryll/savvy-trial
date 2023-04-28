import { Model } from 'sequelize-typescript';
export default class Waitlist extends Model<Waitlist> {
    id: string;
    email: string;
    name: string;
}
