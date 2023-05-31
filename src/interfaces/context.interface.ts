import { Request, Response } from "express";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

export interface MyContext {
  req: Request & { session: Express.SessionStore };
  res: Response;
  em: EntityManager<IDatabaseDriver<Connection>>;
}
