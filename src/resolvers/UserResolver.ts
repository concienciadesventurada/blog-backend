import 'reflect-metadata';
import { User } from '../entities/User';
import { MyContext } from 'src/interfaces/context.interface';
import { Resolver, Query, Mutation, Arg, Field, InputType, Ctx } from "type-graphql";

// TODO: Proper user resolvers

//@InputType()
//class UsernamePasswordInput {
//  @Field()
//  username: string
//
//  @Field()
//  password: string
//}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(
    @Ctx() { em }: MyContext
  ): Promise<User[]> {
    return em.find(User, {});
  }
}
