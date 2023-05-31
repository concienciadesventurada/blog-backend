import "reflect-metadata";
import { Project } from "../entities/Project";
import { MyContext } from "src/interfaces/context.interface";
import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async getProjects(@Ctx() { em }: MyContext): Promise<Project[]> {
    return em.find(Project, {});
  }

  @Mutation(() => Project)
  async createProject(
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string,
    @Arg("devPeriod", () => String) devPeriod: string,
    @Arg("status", () => String) status: string,
    @Arg("url", () => String) url: string,
    @Arg("bullets", () => [String]) bullets: string[],
    @Ctx() { em }: MyContext
  ): Promise<Project | null> {
    const project = em.create(Project, {
      title: title,
      description: description,
      devPeriod: devPeriod,
      status: status,
      url: url,
      bullets: bullets,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await em.persistAndFlush(project);

    return project;
  }
}
