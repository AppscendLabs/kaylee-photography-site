import { z } from "zod";

export const bookingSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255).trim(),
  sessionDate: z.string().datetime(),
  sessionTime: z.string().min(1).max(20),
  sessionType: z.string().min(1).max(100),
  message: z.string().min(1).max(2000).trim(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
