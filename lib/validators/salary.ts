import { z } from "zod";

export const salarySchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  level: z.string().min(1),
  location: z.string().min(1),
  experienceYears: z.number().min(0),
  baseSalary: z.number().min(0),
  bonus: z.number().min(0).optional().default(0),
  stock: z.number().min(0).optional().default(0),
  confidenceScore: z.number().min(0).max(1).optional().default(0.8),
});