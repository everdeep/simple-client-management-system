import { StatusCodes } from 'http-status-codes';

import { Client, ClientWithLanguages, UpdateClient } from '@/api/client/clientModel';
import { Language } from '@/api/language/languageModel';
import { clientMapper } from '@/api/client/clientMapper';
import { ClientRepository } from '@/api/client/clientRepository';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export class ClientService {
    private clientRepository: ClientRepository;

    constructor(repository: ClientRepository = new ClientRepository()) {
        this.clientRepository = repository;
    }

    // Retrieves all clients from the database
    async findAll(): Promise<ServiceResponse<ClientWithLanguages[] | null>> {
        try {
            const rows = await this.clientRepository.findAll();
            if (!rows || rows.length === 0) {
                return ServiceResponse.failure('No Clients found', null, StatusCodes.NOT_FOUND);
            }

            const clientsMap = clientMapper.clientWithLanguages(rows);
            const clients = Array.from(clientsMap.values());
            return ServiceResponse.success<ClientWithLanguages[]>('Clients found', clients);
        } catch (ex) {
            const errorMessage = `Error finding all clients: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                'An error occurred while retrieving clients.',
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Retrieves a single client by their ID
    async findById(id: number): Promise<ServiceResponse<ClientWithLanguages | null>> {
        try {
            const rows = await this.clientRepository.findById(id);
            if (!rows || rows.length === 0) {
                return ServiceResponse.failure('Client not found', null, StatusCodes.NOT_FOUND);
            }
            const clientMap = clientMapper.clientWithLanguages(rows);
            const client = clientMap.get(id) as ClientWithLanguages;
            return ServiceResponse.success<ClientWithLanguages>('Client found', client);
        } catch (ex) {
            const errorMessage = `Error finding client with id ${id}:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                'An error occurred while finding client.',
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Creates a new client
    async createClient(client: Client): Promise<ServiceResponse<number | null>> {
        try {
            const result = await this.clientRepository.createClient(client);
            return ServiceResponse.success<number>('Client created', result);
        } catch (ex) {
            const errorMessage = `Error creating client: ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                'An error occurred while creating client.',
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Updates an existing client
    async updateClient(id: number, clientUpdate: UpdateClient): Promise<ServiceResponse<number | null>> {
        try {
            // Check if client exists
            const existingClient = await this.clientRepository.findById(id);
            if (!existingClient || existingClient.length === 0) {
                return ServiceResponse.failure('Client not found', null, StatusCodes.NOT_FOUND);
            }

            const { languages, ...client } = clientUpdate;

            // If updating languages, ensure they are unique
            // Check unique language IDs
            const uniqueLanguages = new Set<number>();
            for (const language of languages) {
                if (uniqueLanguages.has(language.id)) {
                    return ServiceResponse.failure('Language IDs must be unique', null, StatusCodes.BAD_REQUEST);
                }
                uniqueLanguages.add(language.id);
            }

            // Can only be one primary language
            const primaryLanguages = languages.filter((language) => language.is_primary);
            if (primaryLanguages.length > 1) {
                return ServiceResponse.failure('Only one primary language is allowed', null, StatusCodes.BAD_REQUEST);
            }

            const result = await this.clientRepository.updateClient(id, client as Client, languages);
            if (result === 0) {
                throw new Error('No client found or updated');
            }

            return ServiceResponse.success<number>('Client updated', result);
        } catch (ex) {
            const errorMessage = `Error updating client: ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                'An error occurred while updating client.',
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Deletes an existing client
    async deleteClient(id: number): Promise<ServiceResponse<number | null>> {
        try {
            const result = await this.clientRepository.deleteClient(id);
            if (result === 0) {
                throw new Error('Client not found');
            }
            return ServiceResponse.success<number>('Client deleted', result);
        } catch (ex) {
            const errorMessage = `Error deleting client: ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                'An error occurred while deleting client.',
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Retrieves a client's languages
    async getClientLanguages(id: number): Promise<ServiceResponse<Language[] | null>> {
        try {
            const languages = await this.clientRepository.getClientLanguages(id);
            if (!languages || languages.length === 0) {
                return ServiceResponse.failure('Could not find languages with that ID', null, StatusCodes.NOT_FOUND);
            }
            return ServiceResponse.success<Language[]>('Client languages found', languages);
        } catch (ex) {
            const errorMessage = `Error finding client with id ${id}:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                'An error occurred while finding client.',
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export const clientService = new ClientService();
