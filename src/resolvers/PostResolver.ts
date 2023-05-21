import 'reflect-metadata'
import { Post } from '../entities/Post';
import { MyContext } from 'src/interfaces/context.interface';
import { Resolver, Query, Mutation, Ctx, Arg } from 'type-graphql';

// TODO: Implement proper error handling... once the bug above gets fixed

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async getPosts(
    @Ctx() ctx: MyContext
  ): Promise<Post[]> {
    console.log('ctx', ctx); // outputs: {}
    console.log('ctx.em:', ctx.em); // outputs: undefined

    return ctx.em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  async getPostByUuid(
    @Arg('uuid', () => String) uuid: string,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    console.log(ctx);
    return ctx.em.findOne(Post, { uuid })
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title', () => String) title: string,
    @Arg('content', () => String) content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = em.create(Post, {
      title: title,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await em.persistAndFlush(post);

    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg('uuid', () => String) uuid: string,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Arg('content', () => String, { nullable: true }) content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { uuid });

    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      post.title = title;
      post.updatedAt = new Date();
      await em.persistAndFlush(post);
    }
    if (typeof content !== 'undefined') {
      post.content= content;
      post.updatedAt = new Date();
      await em.persistAndFlush(post);
    }

    return post;
  }

  @Mutation(() => Post)
  async deletePost(
    @Arg('uuid', () => String) uuid: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { uuid });
      return true;
    } catch {
      return false;
    }
  }
}