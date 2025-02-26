import { z } from "zod";

/**
 * Creates a type-safe function to get field descriptions from a Zod object schema.
 *
 * @template T - The type of the Zod object schema
 * @param {T} schema - The Zod object schema containing field descriptions
 * @returns {<K extends keyof z.infer<T>>(field: K) => string} A function that retrieves
 *          the description for a given field in the schema
 *
 * @example
 * const userSchema = z.object({
 *   name: z.string().describe("User's full name"),
 *   email: z.string().email().describe("User's email address")
 * });
 *
 * const getUserDescription = createDescriptionGetter(userSchema);
 * const nameDesc = getUserDescription('name'); // "User's full name"
 *
 * @remarks
 * - The returned function is type-safe and will only accept valid field names from the schema
 * - If a field doesn't have a description, an empty string is returned
 * - This utility is particularly useful for form fields, tooltips, and documentation
 *
 * @throws {TypeError} If the provided schema is not a Zod object schema
 */
export function createDescriptionGetter<T extends z.ZodObject<any>>(
    schema: T,
): <K extends keyof z.infer<T>>(field: K) => string {
    return function getDescription<K extends keyof z.infer<T>>(
        field: K,
    ): string {
        return schema.shape[field as string]?._def?.description ?? "";
    };
}
