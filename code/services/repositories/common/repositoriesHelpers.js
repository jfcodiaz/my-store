class RespositoriesHelpers {
  constructor ({
    boom,
    config,
    getBasePath,
    getAbsoluteUrl,
    sequelize
  }) {
    this.boom = boom;
    this.config = config;
    this.sequelize = sequelize;
    this.getBasePath = getBasePath;
    this.getAbsoluteUrl = getAbsoluteUrl;
  }
}

module.exports = RespositoriesHelpers;
