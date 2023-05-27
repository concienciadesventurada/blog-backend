import 'reflect-metadata';
import { User } from '../entities/User';
import { MyContext } from 'src/interfaces/context.interface';
import { Resolver, Query, Mutation, Arg, Field, InputType, Ctx, ObjectType } from "type-graphql";
import * as argon2 from 'argon2';
import '../session'

// TODO: Proper user resolvers.
// TODO: Refactor ObjectTypes and InputTypes.

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@InputType()
class RegisterNewUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType()
class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { em, req }: MyContext
  ) {
    if (!req.session.userId) {
      return null
    }
    const user = await em.findOne(User, { uuid: req.session.userId })

    return user;
  }

  @Query(() => [User])
  async getUsers(
    @Ctx() { em }: MyContext
  ): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => UserResponse)
  async register(
    @Ctx() { em, req }: MyContext,
    @Arg('options') options: RegisterNewUserInput
  ) {
    // TODO: Proper validation and refactoring.
    if (options.username.length <= 4) {
      return {
        errors: [{
          field: 'Username',
          message: "Username's length must be at least 4 characters long."
        }]
      }
    }
    if (options.email.length <= 0) {
      return {
        errors: [{
          field: 'Email',
          message: "Email can't be empty"
        }]
      }
    }
    if (options.password.length <= 8) {
      return {
        errors: [{
          field: 'Password',
          message: "Password must be at least 8 characters long."
        }]
      }
    }

    const user = em.create(User, {
      username: options.username,
      password: await argon2.hash(options.password),
      email: options.email,
      img: 'oLA',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      // TODO: Specify which field failed.
      if (err.code === '23505') {
        return {
          errors: [{
            field: 'Username or email',
            message: "Username or email has already been taken."
          }]
        };
      }
    }

    // Store the new registered user and log them in.
    req.session.userId = user.uuid;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { em, req }: MyContext,
    @Arg('options') options: LoginInput
  ): Promise<UserResponse> {
    // TODO: Proper validation and refactoring.
    const user = await em.findOne(User, { username: options.username });

    if (!user) {
      return {
        errors: [
          {
            field: 'Username',
            message: "Username doesn't exist."
          }
        ]
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'Password',
            message: "Incorrect password."
          }
        ]
      };
    }

    req.session.userId = user.uuid;

    return { user };
  }
}
