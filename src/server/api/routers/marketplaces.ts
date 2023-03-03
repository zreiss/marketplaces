import {z} from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const marketplacesRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({text: z.string()}))
        .query(({input}) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getAll: publicProcedure.query(({ctx}) => {
        return ctx.prisma.marketplaces.findMany();
    }),

    create: protectedProcedure
        .input(z.object({
            name: z.string(),
            url: z.string(),
            slug: z.string(),
            image_url: z.string(),
        }))
        .mutation(({ctx, input}) => {
            return ctx.prisma.marketplaces.create({
                data: {
                    name: input.name,
                    url: input.url,
                    slug: input.slug,
                    image_url: input?.image_url,
                },
            });
        }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
