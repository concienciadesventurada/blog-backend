import { GraphQLScalarType, Kind, ValueNode } from "graphql";

// TODO: fix.
// FIX: Apply proper scalar, it only accepts [['a', 'b']] and not the proper shape

export type TechStackItem = {
  icon: string;
  title: string;
};

export const TechStackScalar = new GraphQLScalarType({
  name: "TechStack",
  description: "Array of objects representing tech stack",
  parseValue(value: unknown): TechStackItem[] {
    if (!Array.isArray(value)) {
      throw new Error("TechStack scalar value must be an array");
    }
    return value as TechStackItem[];
  },
  serialize(value: unknown): TechStackItem[] {
    if (!Array.isArray(value)) {
      throw new Error("TechStack scalar value must be an array");
    }
    return value as TechStackItem[];
  },
  parseLiteral(ast: ValueNode): TechStackItem[] | null {
    if (ast.kind === Kind.LIST) {
      const items = ast.values.map((value) => {
        if (value.kind === Kind.OBJECT) {
          const item: TechStackItem = {
            icon: "",
            title: "",
          };
          value.fields.forEach((field) => {
            if (field.name.value === "icon") {
              if (field.value.kind === Kind.STRING) {
                item.icon = field.value.value;
              }
            } else if (field.name.value === "title") {
              if (field.value.kind === Kind.STRING) {
                item.title = field.value.value;
              }
            }
          });
          return item;
        }
        return null;
      });
      return items.filter((item) => item !== null) as TechStackItem[];
    }
    return null;
  },
});
