"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
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
`;
//# sourceMappingURL=schemas.js.map