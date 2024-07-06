const sequelize = require("../../../libs/sequelize");

class Repository {
  findRandom() {
    return this.model.findOne({
      order: [
        sequelize.random()
      ]
    });
  }
}

module.exports = Repository;
