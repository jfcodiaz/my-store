module.exports = ({
  title = 'Get all with pagination',
  suite,
  as,
  getExpectedTotal = null
} = {}) => {
  test(title, async () => {
    const { statusCode, body } = await suite
      .as(as)
      .get();

    if (getExpectedTotal) {
      const total = await getExpectedTotal();
      expect(body.total).toBe(total);
    }
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('total');
    expect(body.total).toBeGreaterThan(0);
    expect(body).toHaveProperty('per_page');
    expect(body).toHaveProperty('current_page');
    expect(body).toHaveProperty('last_page');
    expect(body).toHaveProperty('first_page_url');
    expect(body).toHaveProperty('next_page_url');
    expect(body).toHaveProperty('prev_page_url');
    expect(body).toHaveProperty('from');
    expect(body).toHaveProperty('to');
    expect(body).toHaveProperty('data');
    expect(body.data).toBeInstanceOf(Array);
  });
};
