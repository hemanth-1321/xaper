import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ZapCreateSchema = z.object({
  AvailabeTriggerId: z.string(),
  triggerMetaData: z.any().optional(),
  actions: z.array(
    z.object({
      availbeActionId: z.string(),
      actionMetaData: z.any().optional(),
    })
  ),
});
