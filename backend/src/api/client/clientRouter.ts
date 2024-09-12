import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import {
    CreateClientSchema,
    LanguageUpdateSchema,
    ClientUpdateSchema,
    GetClientSchema,
    ClientSchema,
} from '@/api/client/clientModel';
import { LanguageSchema } from '@/api/language/languageModel';
import { validateRequest } from '@/common/utils/httpHandlers';
import { clientController } from './clientController';

export const clientRegistry = new OpenAPIRegistry();
export const clientRouter: Router = express.Router();

clientRegistry.register('Client', ClientSchema);

// GET /clients
clientRegistry.registerPath({
    method: 'get',
    path: '/clients',
    tags: ['Client'],
    responses: createApiResponse(z.array(ClientSchema), 'Success'),
});
clientRouter.get('/', clientController.getClients);

// GET /clients/:id
clientRegistry.registerPath({
    method: 'get',
    path: '/clients/{id}',
    tags: ['Client'],
    request: { params: GetClientSchema.shape.params },
    responses: createApiResponse(ClientSchema, 'Success'),
});
clientRouter.get('/:id', validateRequest(GetClientSchema), clientController.getClient);

// GET /clients/:id/languages
clientRegistry.registerPath({
    method: 'get',
    path: '/clients/{id}/languages',
    tags: ['Client'],
    request: { params: GetClientSchema.shape.params },
    responses: createApiResponse(z.array(LanguageSchema), 'Success'),
});
clientRouter.get('/:id/languages', validateRequest(GetClientSchema), clientController.getClientLanguages);

// POST /clients
clientRegistry.registerPath({
    method: 'post',
    path: '/clients',
    tags: ['Client'],
    request: {
        body: {
            description: 'Create a client',
            content: {
                'application/json': {
                    schema: CreateClientSchema.shape.body,
                },
            },
        },
    },
    responses: createApiResponse(z.number(), 'Success'),
});
clientRouter.post('/', validateRequest(CreateClientSchema), clientController.createClient);

// PUT /clients
clientRegistry.registerPath({
    method: 'put',
    path: '/clients',
    tags: ['Client'],
    request: {
        body: {
            description: 'Update a client',
            content: {
                'application/json': {
                    schema: ClientUpdateSchema.shape.body,
                },
            },
        },
    },
    responses: createApiResponse(z.number(), 'Success'),
});
clientRouter.put('/', validateRequest(ClientUpdateSchema), clientController.updateClient);

// PUT /clients/languages
clientRegistry.registerPath({
    method: 'put',
    path: '/clients/languages',
    tags: ['Client'],
    request: {
        body: {
            description: "Update a client's languages",
            content: {
                'application/json': {
                    schema: LanguageUpdateSchema.shape.body,
                },
            },
        },
    },
    responses: createApiResponse(z.number(), 'Success'),
});
clientRouter.put('/languages', validateRequest(LanguageUpdateSchema), clientController.updateClientLanguages);
