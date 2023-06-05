import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

// TODO: Relations.

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryKey({ type: "uuid" })
  uuid!: string;

  @Field(() => String)
  @Property({ type: "text" })
  title!: string;

  @Field(() => String)
  @Property({ type: "text" })
  content!: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "varchar(255)" })
  abstract?: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "text" })
  coverImg?: string;

  @Field(() => Date)
  @Property({ type: "date" })
  createdAt!: Date;

  @Field(() => Date)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt!: Date;

  // TODO: Make UTC
  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
