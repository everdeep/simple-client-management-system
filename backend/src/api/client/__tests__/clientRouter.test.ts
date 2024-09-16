import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import type { ClientWithLanguages } from '@/api/client/clientModel';
import type { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Client API Endpoints', () => {
    describe('GET /clients', () => {
        it('should return a list of clients', async () => {
            // Act
            const response = await request(app).get('/clients');
            const responseBody: ServiceResponse<ClientWithLanguages[]> = response.body;

            // Assert
            expect(response.statusCode).toEqual(StatusCodes.OK);
            expect(responseBody.success).toBeTruthy();
            expect(responseBody.message).toContain('Clients found');
        });
    });

    describe('GET /clients/:id', () => {
        it('should return a client for a valid ID', async () => {
            // Arrange
            const testId = 1;
            const expectedClient = {
                id: 1,
                first_name: 'John',
                middle_name: 'Smith',
                last_name: 'Doe',
                email: 'johndoe@fake.com',
                dob: '1990-01-01',
                funding_source: 'NDIS',
                languages: [
                    {
                        id: 1,
                        name: 'English',
                        is_primary: true,
                    },
                ],
            } as ClientWithLanguages;

            // Act
            const response = await request(app).get(`/clients/${testId}`);
            const responseBody: ServiceResponse<ClientWithLanguages> = response.body;

            // Assert
            expect(response.statusCode).toEqual(StatusCodes.OK);
            expect(responseBody.success).toBeTruthy();
            expect(responseBody.message).toContain('Client found');
            if (!expectedClient) throw new Error('Invalid test data: expectedClient is undefined');
            compareClients(expectedClient, responseBody.responseObject);
        });

        it('should return a not found error for non-existent ID', async () => {
            // Arrange
            const testId = Number.MAX_SAFE_INTEGER;

            // Act
            const response = await request(app).get(`/clients/${testId}`);
            const responseBody: ServiceResponse = response.body;

            // Assert
            expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
            expect(responseBody.success).toBeFalsy();
            expect(responseBody.message).toContain('Client not found');
            expect(responseBody.responseObject).toBeNull();
        });

        it('should return a bad request for invalid ID format', async () => {
            // Act
            const invalidInput = 'abc';
            const response = await request(app).get(`/clients/${invalidInput}`);
            const responseBody: ServiceResponse = response.body;

            // Assert
            expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
            expect(responseBody.success).toBeFalsy();
            expect(responseBody.message).toContain('Invalid input');
            expect(responseBody.responseObject).toBeNull();
        });
    });
});

function compareClients(mockClient: ClientWithLanguages, responseClient: ClientWithLanguages) {
    if (!mockClient || !responseClient) {
        throw new Error('Invalid test data: mockClient or responseClient is undefined');
    }

    expect(responseClient.id).toEqual(mockClient.id);
    expect(responseClient.first_name).toEqual(mockClient.first_name);
    expect(responseClient.middle_name).toEqual(mockClient.middle_name);
    expect(responseClient.last_name).toEqual(mockClient.last_name);
    expect(responseClient.email).toEqual(mockClient.email);
    expect(responseClient.dob).toEqual(mockClient.dob);
    expect(responseClient.funding_source).toEqual(mockClient.funding_source);
    expect(responseClient.languages.length).toEqual(mockClient.languages.length);
    responseClient.languages.forEach((language, index) => {
        expect(language.id).toEqual(mockClient.languages[index].id);
        expect(language.name).toEqual(mockClient.languages[index].name);
        expect(language.is_primary).toEqual(mockClient.languages[index].is_primary);
    });
}
