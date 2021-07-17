import { Optional } from "sequelize/types";

export interface ImageDataAttributes {
  id: number;
  path: string;
}

export interface ImageDataCreationAttributes extends Optional<ImageDataAttributes, 'id'> {
}