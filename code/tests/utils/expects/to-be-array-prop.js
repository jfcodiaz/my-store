module.exports = (props, entity, body) => {
  props.forEach(prop => {
    expect(entity[prop]).toBe(body[prop]);
  })
}
