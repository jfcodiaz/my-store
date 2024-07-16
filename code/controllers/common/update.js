module.exports = (repostory) =>
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updateUser = await repostory.update(id, data);

    res.json(updateUser);
  }
;
