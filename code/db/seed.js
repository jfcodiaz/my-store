const getQueryIterface = (queryInterface) => {
  if (queryInterface.context) {
    queryInterface = queryInterface.context;
  }
  return queryInterface;
};

const seed = ({ up: userUp, down: userDown } = {}) => {
  return {
    up: (queryInterface) => userUp(getQueryIterface(queryInterface)),
    down: (queryInterface) => userDown(getQueryIterface(queryInterface))
  };
};

module.exports = {
  seed
};
