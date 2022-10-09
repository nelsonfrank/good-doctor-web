import { createProtectedRouter } from "./context";

export const userRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("users", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  });
