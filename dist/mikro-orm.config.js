"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("@mikro-orm/reflection");
const path_1 = __importDefault(require("path"));
const config = {
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}'
    },
    entities: ['./dist/entities/*.js'],
    entitiesTs: ['./src/entities/*.ts'],
    type: 'postgresql',
    dbName: 'test',
    user: 'admin',
    password: 'admin',
    debug: process.env.NODE_ENV !== 'production',
    allowGlobalContext: true
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map