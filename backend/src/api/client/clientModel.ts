import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@/common/utils/commonValidation';
import { LanguageSchema } from '@/api/language/languageModel';

extendZodWithOpenApi(z);

export type Client = z.infer<typeof ClientSchema>;
export const ClientSchema = z.object({
    id: commonValidations.id,
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    email: z.string().email(),
    dob: commonValidations.date,
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    fundingId: commonValidations.id,
});

export type ClientWithLanguages = z.infer<typeof ClientWithLanguagesSchema>;
export const ClientWithLanguagesSchema = ClientSchema.omit({ fundingId: true }).merge(
    z.object({
        fundingSource: z.string(),
        languages: z.array(LanguageSchema),
    })
);

// Input Validation for 'GET clients/:id' endpoint
export const GetClientSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

// Input Validation for 'POST clients' endpoint
export type CreateClient = z.infer<typeof CreateClientSchema.shape.body>;
export const CreateClientSchema = z.object({
    body: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
        email: commonValidations.email,
        dob: commonValidations.date,
        fundingId: commonValidations.id,
        languages: z.array(LanguageSchema.omit({ name: true })),
    }),
});

// Input Validation for 'PUT clients' endpoint
export type UpdateClient = z.infer<typeof UpdateClientSchema.shape.body>;
export const UpdateClientSchema = z.object({
    params: z.object({ id: commonValidations.id }),
    body: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
        email: commonValidations.email,
        dob: commonValidations.date,
        fundingId: commonValidations.id,
        languages: z.array(LanguageSchema.omit({ name: true })),
    }),
});
