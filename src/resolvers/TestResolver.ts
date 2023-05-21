// TODO: Proper resolvers once it fetches via Mikro-ORM

export const TestResolver = {
  Query: {
    getTest() {
      return 'Hi, Im a test resolver';
    },
    getTestPosts() {
      return 'Hi, Im a test resolver';
    }
  }
}
