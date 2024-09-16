import { commonValidations } from '@/common/utils/commonValidation';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export type Language = z.infer<typeof LanguageSchema>;
export const LanguageSchema = z.object({
    id: commonValidations.id,
    name: z.string().optional(),
    is_primary: commonValidations.bool,
});
