import "reflect-metadata";
import { Post } from "../entities/Post";
import { MyContext } from "src/interfaces/context.interface";
import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";

// TODO: Implement proper error handling... once the bug above gets fixed

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getPosts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  async getPostByUuid(
    @Arg("uuid", () => String) uuid: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { uuid });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Arg("content", () => String) content: string,
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
    @Arg("uuid", () => String) uuid: string,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Arg("content", () => String, { nullable: true }) content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { uuid });

    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      post.updatedAt = new Date();
      await em.persistAndFlush(post);
    }
    if (typeof content !== "undefined") {
      post.content = content;
      post.updatedAt = new Date();
      await em.persistAndFlush(post);
    }

    return post;
  }

  // FIX: It deletes but it states cannot return null
  @Mutation(() => Post)
  async deletePost(
    @Arg("uuid", () => String) uuid: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean | null> {
    try {
      await em.nativeDelete(Post, { uuid });
      return true;
    } catch {
      return false;
    }
  }
}
