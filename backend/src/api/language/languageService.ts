import { StatusCodes } from 'http-status-codes';

import type { Language } from '@/api/language/languageModel';
import { LanguageRepository } from './languageRepository';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export class LanguageService {
    private languageRepository: LanguageRepository;

    constructor(repository: LanguageRepository = new LanguageRepository()) {
        this.languageRepository = repository;
    }

    // Retrieves all languages from the database
    async findAll(): Promise<ServiceResponse<Language[] | null>> {
        try {
            const languages = await this.languageRepository.findAllAsync();
            if (!languages || languages.length === 0) {
                return ServiceResponse.failure('No languages found', null, StatusCodes.NOT_FOUND);
            }
            return ServiceResponse.success<Language[]>('Languages found', languages);
        } catch (ex) {
            const errorMessage = `Error finding all languages: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                'An error occurred while retrieving languages.',
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export const languageService = new LanguageService();
