import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

// TODO: Relations.

@Entity()
export class Post {
  @PrimaryKey({ type: 'uuid' })
  uuid!: string

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  content!: string;

  @Property({ type: 'date'})
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor() {
    this.uuid = uuidv4();
  }
}
