import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Field } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';

// TODO: Relations.

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  uuid!: string

  @Field(() => String)
  @Unique()
  @Property({ type: 'varchar(255)' })
  username!: string;

  @Field(() => String)
  @Unique()
  @Property({ type: 'varchar(255)' })
  email!: string;

  // NOTE: Delete once proper authentication is implemented.
  @Field(() => String)
  @Property({ type: 'text' })
  password!: string;

  @Field(() => String)
  @Property({ type: 'text'})
  img: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
