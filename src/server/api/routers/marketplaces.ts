import {z} from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const marketplacesRouter = createTRPCRouter({
    get: protectedProcedure
        .input(z.object({id: z.number()}))
        .query(({ctx, input}) => {
            return ctx.prisma.marketplaces.findUnique({
                where: {
                    id: input.id,
                },
            });
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
