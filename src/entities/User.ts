import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';

// TODO: Relations.

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
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
    this.img = 'https://i.pinimg.com/736x/2c/8a/38/2c8a3855dd719c88c49619b96e2ee2e4.jpg'
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
