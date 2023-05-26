import { Model } from 'sequelize-typescript';
export default class Brand extends Model<Brand> {
    id: string;
    name: string;
    slug: string;
    image: string;
}
