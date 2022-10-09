import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const patientSignUpSchema = loginSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  dot: z.date(),
});

export const doctorSignUpSchema = loginSchema.extend({
  fullName: z.string(),
  specialization: z.object({ value: z.string(), label: z.string() }),
  workPlace: z.string(),
  description: z.string(),
});


export const userSchema = z.object({
  id: z.nullable(z.string()),
  name: z.string(),
  email: z.string(),
  dot: z.nullable(z.date()),
  specialization: z.nullable(z.string()),
  description: z.nullable(z.string()),
  workPlace: z.nullable(z.string()),
  role: z.string(),
  status: z.string(),
  image: z.nullable(z.string()),
});

export const signUpSchema = z.union([patientSignUpSchema, doctorSignUpSchema]);

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type IDoctorSignUp = z.infer<typeof doctorSignUpSchema>;
export type IPatientrSignUp = z.infer<typeof patientSignUpSchema>;
export type IUser = z.infer<typeof userSchema>;
