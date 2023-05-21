import gql from "graphql-tag";

//getPosts(uuid: String!): [Post]
//getPost(uuid: String!): Post

export const typeDefs = gql`
  type Query {
    getPosts: [Post!]!
    getTestPosts: [Post!]!
    getPostByUuid(uuid: String): Post
    "TEST RESOLVER"
    getTest: String
  }

  type Post {
    uuid: String!
    title: String!
    content: String!
    createdAt: String
    updatedAt: String
  }
`

