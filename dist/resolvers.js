"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        getPosts: () => { return ['o', 'L', 'A']; },
        Post: () => { return crypto.randomUUID(); }
    }
};
//# sourceMappingURL=resolvers.js.map