"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@mikro-orm/core");
const server_1 = require("@apollo/server");
const PostResolver_1 = require("./resolvers/PostResolver");
const type_graphql_1 = require("type-graphql");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = require("body-parser");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const main = async () => {
    const PORT = process.env.PORT;
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const apolloServer = new server_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [PostResolver_1.PostResolver]
        }),
    });
    const app = (0, express_1.default)();
    app.listen(PORT, () => {
        console.log(`Express server running at port: ${PORT}`);
    });
    app.use('/graphql', (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(apolloServer, {
        context: async ({ req, res }) => ({ em: orm.em.fork(), req, res }),
    }));
};
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map