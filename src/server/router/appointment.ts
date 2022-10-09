import { appointmentSchema } from "../common/validation/appointment";
import { createProtectedRouter } from "./context";
import { z } from "zod";

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
  })
  .query("byId", {
    input: z.object({ id: z.string(), role: z.string() }),
    async resolve({ ctx, input }) {
      const { id, role } = input;

      if (role === "patient") {
        return await ctx.prisma.appointment.findMany({
          where: { patientId: id },
        });
      }

      if (role === "doctor") {
        return await ctx.prisma.appointment.findMany({
          where: { doctorId: id },
        });
      }
      return await ctx.prisma.appointment.findMany();
    },
  })
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.appointment.findMany();
    },
  });
