import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getPosts(uuid: String!): [Post]
    Post(uuid: String!): Post
  }

  type Post {
    uuid: String!
    title: String!
    content: String!
    createdAt: String
    updatedAt: String
  }
`

