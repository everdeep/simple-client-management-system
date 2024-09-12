import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { commonValidations } from '@/common/utils/commonValidation';
import { LanguageSchema } from '@/api/language/languageModel';

extendZodWithOpenApi(z);

export type Client = z.infer<typeof ClientSchema>;
export const ClientSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    email: z.string().email(),
    dob: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    funding_source: z.string(),
});

export type ClientWithLanguages = z.infer<typeof ClientWithLanguagesSchema>;
export const ClientWithLanguagesSchema = z.object({
    client: ClientSchema,
    languages: z.array(LanguageSchema),
});

// Input Validation for 'GET clients/:id' endpoint
export const GetClientSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

// Input Validation for 'POST clients' endpoint
export const CreateClientSchema = z.object({
    body: z.object({
        first_name: commonValidations.name,
        middle_name: commonValidations.name.optional(),
        last_name: commonValidations.name,
        email: commonValidations.email,
        dob: commonValidations.date,
        funding_id: commonValidations.id,
        language_ids: z.array(commonValidations.id),
    }),
});

// Input Validation for 'PUT clients' endpoint
export const ClientUpdateSchema = z.object({
    body: z.object({
        id: commonValidations.id,
        first_name: commonValidations.name.optional(),
        middle_name: commonValidations.name.optional(),
        last_name: commonValidations.name.optional(),
        email: commonValidations.email.optional(),
        dob: commonValidations.date.optional(),
        funding_id: commonValidations.id.optional(),
    }),
});

export const LanguageUpdateSchema = z.object({
    body: z.object({
        clientId: commonValidations.id,
        languages: z.array(
            z.object({
                id: commonValidations.id,
                is_primary: z.boolean(),
            })
        ),
    }),
});
