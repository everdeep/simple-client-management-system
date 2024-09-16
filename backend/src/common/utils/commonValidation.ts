import { z } from 'zod';

export const commonValidations = {
    id: z
        .string()
        .refine((data) => !Number.isNaN(Number(data)), 'ID must be a numeric value')
        .transform(Number)
        .refine((num) => num > 0, 'ID must be a positive number')
        .default('1'),
    email: z
        .string()
        .email()
        .transform((str) => str.toLowerCase()),
    date: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })
        .default(() => new Date().toISOString().split('T')[0]),
    name: z.string().min(3),
    bool: z.boolean().transform((val) => !!val),
};
