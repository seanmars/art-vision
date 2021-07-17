import { Model } from "sequelize";

import { ImageDataAttributes, ImageDataCreationAttributes } from '../interfaces/ImageDataAttributes';

export default class ImageData extends Model<ImageDataAttributes, ImageDataCreationAttributes>
  implements ImageDataAttributes {
  public id!: number;
  public path!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
