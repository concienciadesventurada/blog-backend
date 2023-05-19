// TODO: Proper resolvers once it fetches via Mikro-ORM

export const resolvers = {
  Query: {
    getPosts: () => { return ['o', 'L', 'A'] },
    Post: () => { return crypto.randomUUID() }
  }
}
