class TagController {
  async getAll () {
    try {
      const posts = await PostService.getAll();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e)
    }
  }
}
