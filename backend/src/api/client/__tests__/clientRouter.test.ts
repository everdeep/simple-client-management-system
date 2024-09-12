import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import type { Client } from '@/api/client/clientModel';
import type { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';


describe('Client API Endpoints', () => {
    describe('GET /clients', () => {
        it('should return a list of clients', async () => {
            // Act
            const response = await request(app).get('/clients');
            const responseBody: ServiceResponse<Client[]> = response.body;

            // Assert
            expect(response.statusCode).toEqual(StatusCodes.OK);
            expect(responseBody.success).toBeTruthy();
            expect(responseBody.message).toContain('Clients found');
            // expect(responseBody.responseObject.length).toEqual(clients.length);
            // responseBody.responseObject.forEach((client, index) => compareClients(clients[index] as Client, client));
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
                funding_id: 1
            } as Client;

            // Act
            const response = await request(app).get(`/clients/${testId}`);
            const responseBody: ServiceResponse<Client> = response.body;

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

function compareClients(mockClient: Client, responseClient: Client) {
    if (!mockClient || !responseClient) {
        throw new Error('Invalid test data: mockClient or responseClient is undefined');
    }

    expect(responseClient.id).toEqual(mockClient.id);
    expect(responseClient.first_name).toEqual(mockClient.first_name);
    expect(responseClient.middle_name).toEqual(mockClient.middle_name);
    expect(responseClient.last_name).toEqual(mockClient.last_name);
    expect(responseClient.email).toEqual(mockClient.email);
    expect(responseClient.dob).toEqual(mockClient.dob);
    expect(responseClient.funding_id).toEqual(mockClient.funding_id);
    // expect(new Date(responseClient.createdAt)).toEqual(mockClient.createdAt);
    // expect(new Date(responseClient.updatedAt)).toEqual(mockClient.updatedAt);
}
