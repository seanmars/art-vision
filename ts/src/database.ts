import { Op } from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';

import appConfig from './config';
import ImageData from './data/ImageData';
import { ImageDataCreationAttributes } from './interfaces/ImageDataAttributes';

class Database {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(appConfig.connection);

    this.init();
  }

  private init() {
    ImageData.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'image',
        sequelize: this.sequelize
      });
  }

  public async syncSchema() {
    await this.sequelize.sync({ alter: true });
  }

  public async upsertImage(data: ImageDataCreationAttributes): Promise<boolean> {
    let existsData = await ImageData.findOne({
      where: {
        path: {
          [Op.eq]: data.path
        }
      }
    });

    if (existsData == null) {
      // update
      const insertResult = await ImageData.create(data);
      return true;
    } else {
      // insert
      const id = existsData.id;
      const [updateCount,] = await ImageData.update(data, {
        where: {
          id: {
            [Op.eq]: id
          }
        },
        fields: ['path']
      });

      if (updateCount === 0) {
        return false;
      }

      return true;
    }
  }
}

const db = new Database();
export default db;