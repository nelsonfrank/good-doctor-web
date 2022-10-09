import * as trpc from "@trpc/server";
import { hash } from "argon2";

import { createRouter } from "./context";
import {
  doctorSignUpSchema,
  patientSignUpSchema,
} from "../common/validation/auth";

export const authRouter = createRouter()
  .mutation("signup", {
    input: patientSignUpSchema,
    resolve: async ({ input, ctx }) => {
      const { email, password, firstName, lastName, ...other } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          ...other,
          role: "patient",
          status: "active",
          name: `${firstName} ${lastName}`,
          email,
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },
  })
  .mutation("signup.doctor", {
    input: doctorSignUpSchema,
    resolve: async ({ input, ctx }) => {
      const { email, password, fullName, specialization, ...other } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          ...other,
          role: "doctor",
          status: "inactive",
          name: fullName,
          specialization: specialization.value,
          email,
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },
  });
