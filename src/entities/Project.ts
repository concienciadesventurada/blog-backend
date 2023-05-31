import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";
import { v4 as uuidv4 } from "uuid";

// TODO: Relations.
// TODO: Proper scalar type for TechStack

@ObjectType()
@Entity()
export class Project {
  @Field(() => String)
  @PrimaryKey({ type: "uuid" })
  uuid!: string;

  @Field(() => String)
  @Property({ type: "text" })
  title!: string;

  @Field(() => String)
  @Property({ type: "text" })
  description!: string;

  @Field(() => String)
  @Property({ type: "text" })
  devPeriod!: string;

  @Field(() => String)
  @Property({ type: "text" })
  status!: string;

  @Field(() => String)
  @Property({ type: "text" })
  url!: string;

  @Field(() => [String])
  @Property({ type: "array" })
  bullets!: string[];

  @Field(() => Date)
  @Property({ type: "date" })
  createdAt: Date;

  @Field(() => Date)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date;

  // TODO: Add TechStack column.

  constructor() {
    this.uuid = uuidv4();
  }
}
