import { StatusCodes } from 'http-status-codes';
import type { Mock } from 'vitest';

import { ClientRepository } from '@/api/client/clientRepository';
import { ClientService } from '@/api/client/clientService';
import { mockClients } from './mocks';

vi.mock('@/api/client/clientRepository');

describe('clientService', () => {
    let clientServiceInstance: ClientService;
    let clientRepositoryInstance: ClientRepository;

    beforeEach(() => {
        clientRepositoryInstance = new ClientRepository();
        clientServiceInstance = new ClientService(clientRepositoryInstance);
    });

    describe('findAll', () => {
        it('return all clients', async () => {

            console.log(mockClients);
            // Arrange
            (clientRepositoryInstance.findAll as Mock).mockReturnValue(mockClients);

            // Act
            const result = await clientServiceInstance.findAll();

            // Assert
            expect(result.statusCode).toEqual(StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).equals('Clients found');
            expect(result.responseObject).toEqual(mockClients);
        });

        it('returns a not found error for no clients found', async () => {
            // Arrange
            (clientRepositoryInstance.findAll as Mock).mockReturnValue(null);

            // Act
            const result = await clientServiceInstance.findAll();

            // Assert
            expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
            expect(result.success).toBeFalsy();
            expect(result.message).equals('No Clients found');
            expect(result.responseObject).toBeNull();
        });

        it('handles errors for findAll', async () => {
            // Arrange
            (clientRepositoryInstance.findAll as Mock).mockRejectedValue(new Error('Database error'));

            // Act
            const result = await clientServiceInstance.findAll();

            // Assert
            expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).equals('An error occurred while retrieving clients.');
            expect(result.responseObject).toBeNull();
        });
    });

    describe('findById', () => {
        it('returns a client for a valid ID', async () => {
            // Arrange
            const testId = 1;
            const mockClient = mockClients.find((client) => client.id === testId);
            (clientRepositoryInstance.findById as Mock).mockReturnValue(mockClient);

            // Act
            const result = await clientServiceInstance.findById(testId);

            // Assert
            expect(result.statusCode).toEqual(StatusCodes.OK);
            expect(result.success).toBeTruthy();
            expect(result.message).equals('Client found');
            expect(result.responseObject).toEqual(mockClient);
        });

        it('handles errors for findById', async () => {
            // Arrange
            const testId = 1;
            (clientRepositoryInstance.findById as Mock).mockRejectedValue(new Error('Database error'));

            // Act
            const result = await clientServiceInstance.findById(testId);

            // Assert
            expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(result.success).toBeFalsy();
            expect(result.message).equals('An error occurred while finding client.');
            expect(result.responseObject).toBeNull();
        });

        it('returns a not found error for non-existent ID', async () => {
            // Arrange
            const testId = 1;
            (clientRepositoryInstance.findById as Mock).mockReturnValue(null);

            // Act
            const result = await clientServiceInstance.findById(testId);

            // Assert
            expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
            expect(result.success).toBeFalsy();
            expect(result.message).equals('Client not found');
            expect(result.responseObject).toBeNull();
        });
    });
});
