import { appointmentSchema } from "../common/validation/appointment";
import { createProtectedRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

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
  .mutation("delete", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const appointment = await ctx.prisma.appointment.findUnique({
        where: { id },
      });

      if (!appointment) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "appointment doesn't exists.",
        });
      }

      const deletedAppointment = await ctx.prisma.appointment.delete({
        where: { id },
      });

      return deletedAppointment;
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
