import { z } from "zod";

const NewTaskType = z.object({
  title: z.string().min(1),
  status: z.string().min(1),
  priority: z.string().optional(),
  deadline: z.date().optional(),
  description: z.string().optional(),
});

export const validateNewTaskType = (inputs: unknown) => {
  const isValid = NewTaskType.safeParse(inputs);
  return isValid;
};
