import { appointmentSchema } from "../common/validation/appointment";
import { createProtectedRouter } from "./context";

export const appointmentRouter = createProtectedRouter()
  .mutation("create", {
    input: appointmentSchema,
    async resolve({ ctx, input }) {
      const { appointmentDate, ...other } = input;
      const appointment = await ctx.prisma.appointment.create({
        data: {
          ...other,
          appointmentDate: appointmentDate?.toLocaleDateString(),
        },
      });

      return appointment;
    },
  })
  .query("delete", {
    resolve({ ctx }) {
      console.log(ctx.prisma);
      return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
    },
  });
