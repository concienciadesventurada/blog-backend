/// <reference types="express-session" />
import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';
export interface MyContext {
    req: Request & {
        session: Express.SessionStore;
    };
    res: Response;
    em: EntityManager<IDatabaseDriver<Connection>>;
}
