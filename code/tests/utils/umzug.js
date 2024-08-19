const sequelize = require('./../../db/sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const umzug = new Umzug({
  migrations: { glob: './db/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined
});

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();
  } catch (error) {
    console.error(error);
  }
};

const downSeed = async () => {
  await sequelize.drop();
};

const resetSeed = async () => {
  downSeed();
  await sequelize.sync({ force: true });
  await umzug.up();
};

module.exports = { upSeed, downSeed, resetSeed };
