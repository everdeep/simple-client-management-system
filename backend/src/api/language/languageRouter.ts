import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { LanguageSchema } from '@/api/language/languageModel';
import { languageController } from './languageController';

export const languageRegistry = new OpenAPIRegistry();
export const languageRouter: Router = express.Router();

languageRegistry.register('Language', LanguageSchema);

languageRegistry.registerPath({
    method: 'get',
    path: '/languages',
    tags: ['Language'],
    responses: createApiResponse(z.array(LanguageSchema), 'Success'),
});

languageRouter.get('/', languageController.getLanguages);
