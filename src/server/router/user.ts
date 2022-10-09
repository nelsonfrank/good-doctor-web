import { createProtectedRouter } from "./context";
import { z } from "zod";

export const userRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .query("byRole", {
    input: z.object({ role: z.string() }),
    async resolve({ ctx, input }) {
      const { role } = input;
      const doctors = await ctx.prisma.user.findMany({
        where: { role },
      });

      return doctors;
    },
  })
  .query("byId", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const { id } = input;

      return await ctx.prisma.user.findUnique({
        where: { id },
      });
    },
  });
