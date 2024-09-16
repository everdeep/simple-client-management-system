import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import {
    ClientSchema,
    CreateClientSchema,
    UpdateClientSchema,
    GetClientSchema,
    ClientWithLanguagesSchema,
} from '@/api/client/clientModel';
import { LanguageSchema } from '@/api/language/languageModel';
import { validateRequest } from '@/common/utils/httpHandlers';
import { clientController } from './clientController';

export const clientRegistry = new OpenAPIRegistry();
export const clientRouter: Router = express.Router();

clientRegistry.register('Client', ClientWithLanguagesSchema);

// Get all clients
clientRegistry.registerPath({
    method: 'get',
    path: '/clients',
    tags: ['Client'],
    responses: createApiResponse(z.array(ClientWithLanguagesSchema), 'Success'),
});
clientRouter.get('/', clientController.getClients);

// Get a client
clientRegistry.registerPath({
    method: 'get',
    path: '/clients/{id}',
    tags: ['Client'],
    request: { params: GetClientSchema.shape.params },
    responses: createApiResponse(ClientWithLanguagesSchema, 'Success'),
});
clientRouter.get('/:id', validateRequest(GetClientSchema), clientController.getClient);

// Get a client's languages
clientRegistry.registerPath({
    method: 'get',
    path: '/clients/{id}/languages',
    tags: ['Client'],
    request: { params: GetClientSchema.shape.params },
    responses: createApiResponse(z.array(LanguageSchema), 'Success'),
});
clientRouter.get('/:id/languages', validateRequest(GetClientSchema), clientController.getClientLanguages);

// Create a client
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

// Update a client
clientRegistry.registerPath({
    method: 'put',
    path: '/clients/{id}',
    tags: ['Client'],
    request: {
        params: UpdateClientSchema.shape.params,
        body: {
            description: 'Update a client',
            content: {
                'application/json': {
                    schema: UpdateClientSchema.shape.body,
                },
            },
        },
    },
    responses: createApiResponse(z.number(), 'Success'),
});
clientRouter.put('/:id', validateRequest(UpdateClientSchema), clientController.updateClient);

// Delete a client
clientRegistry.registerPath({
    method: 'delete',
    path: '/clients/{id}',
    tags: ['Client'],
    request: { params: GetClientSchema.shape.params },
    responses: createApiResponse(z.number(), 'Success'),
});
clientRouter.delete('/:id', validateRequest(GetClientSchema), clientController.deleteClient);