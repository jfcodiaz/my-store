module.exports = (props, expectObject, valuesObject) => {
  props.forEach(prop => {
    expect(expectObject[prop]).not.toBe(valuesObject[prop]);
  });
};
