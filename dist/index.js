"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@mikro-orm/core");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schemas_1 = require("./schemas");
const resolvers_1 = require("./resolvers");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const schema_1 = require("@graphql-tools/schema");
const main = async () => {
    const PORT = process.env.PORT;
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const apolloServer = new server_1.ApolloServer({
        schema: (0, schema_1.makeExecutableSchema)({ typeDefs: schemas_1.typeDefs, resolvers: resolvers_1.resolvers }),
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(apolloServer, { listen: { port: 4000 } });
    const app = (0, express_1.default)();
    console.log('Apollo server running' + url);
    app.listen(PORT, () => {
        console.log(`Express server running at port: ${PORT}`);
    });
};
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map