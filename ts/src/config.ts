import { Options } from 'sequelize';

interface IAppConfig {
  connection: Options,
  resourcePath: string,
}

const inMemoryConnectionOptions: Options = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: true,
};

const inFileConnectionOptions: Options = {
  dialect: 'sqlite',
  storage: './storage/data.sqlite',
  logging: false,
};

const appConfig: IAppConfig = {
  connection: inFileConnectionOptions,
  resourcePath: './res',
};

export default appConfig;