module.exports = ({ encrypt, config }) => {
  return async (password) => await encrypt.hash(password, config.encryptSalt);
};
