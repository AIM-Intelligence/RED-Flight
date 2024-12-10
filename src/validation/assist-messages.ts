import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  'blacknet ai': z.boolean().optional(),
  user: z.boolean().optional(),
  'assist ai': z.boolean().optional(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
