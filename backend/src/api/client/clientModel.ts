import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@/common/utils/commonValidation';
import { LanguageSchema } from '@/api/language/languageModel';

extendZodWithOpenApi(z);

export type Client = z.infer<typeof ClientSchema>;
export const ClientSchema = z.object({
    id: commonValidations.id,
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    email: z.string().email(),
    dob: commonValidations.date,
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    funding_id: commonValidations.id,
});

export type ClientWithLanguages = z.infer<typeof ClientWithLanguagesSchema>;
export const ClientWithLanguagesSchema = ClientSchema.omit({ funding_id: true }).merge(
    z.object({
        funding_source: z.string(),
        languages: z.array(LanguageSchema),
    })
);

// Input Validation for 'GET clients/:id' endpoint
export const GetClientSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

// Input Validation for 'POST clients' endpoint
export const CreateClientSchema = z.object({
    body: ClientSchema.omit({ id: true, created_at: true, updated_at: true }),
});

// Input Validation for 'PUT clients' endpoint
export type UpdateClient = z.infer<typeof UpdateClientSchema.shape.body>;
export const UpdateClientSchema = z.object({
    params: z.object({ id: commonValidations.id }),
    body: z.object({
        first_name: z.string(),
        middle_name: z.string().optional(),
        last_name: z.string(),
        email: commonValidations.email,
        dob: commonValidations.date,
        funding_id: commonValidations.id,
        languages: z.array(LanguageSchema.omit({ name: true })),
    }),
});
