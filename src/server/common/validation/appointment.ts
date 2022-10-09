import * as z from "zod";

export const appointmentSchema = z.object({
  id: z.string().optional(),
  appointmentDate: z.date().nullable(),
  patientCategory: z.string(),
  doctorId: z.string(),
  patientId: z.string(),
  category: z.string(),
  description: z.string().optional(),
  status: z.string(),
});

export type IAppointment = z.infer<typeof appointmentSchema>;
