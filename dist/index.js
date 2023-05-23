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
const UserResolver_1 = require("./resolvers/UserResolver");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const main = async () => {
    const PORT = process.env.PORT;
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const apolloServer = new server_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [PostResolver_1.PostResolver, UserResolver_1.UserResolver]
        }),
    });
    await apolloServer.start();
    const app = (0, express_1.default)();
    let redisClient = (0, redis_1.createClient)();
    redisClient.connect().catch(console.error);
    redisClient.on('connect', () => {
        console.log('Connected to Redis Server');
    });
    redisClient.on('error', (err) => {
        console.log('Error connecting to Redis Server', err);
    });
    let redisStore = new connect_redis_1.default({
        client: redisClient,
        prefix: "testing-blog:",
        disableTouch: true
    });
    app.use((0, express_session_1.default)({
        name: "testing-session-cookie",
        store: redisStore,
        resave: false,
        saveUninitialized: false,
        secret: "keyboard cat",
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        }
    }));
    app.use('/graphql', (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(apolloServer, {
        context: async ({ req, res }) => (res.setHeader('x-apollo-operation-name', 'testing-csrf'),
            { em: orm.em.fork(), req, res }),
    }));
    app.listen(PORT, () => {
        console.log(`Express server running at port: ${PORT}`);
    });
};
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map