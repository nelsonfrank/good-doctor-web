import { createProtectedRouter } from "./context";

export const appointmentRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("appointments", {
    resolve({ ctx }) {
      console.log(ctx.prisma);
      return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
    },
  });
