import { ClientWithLanguages } from '@/api/client/clientModel';

export class ClientMapper {
    // Maps the client information with the languages they speak
    clientWithLanguages = (rows: any): Map<number, ClientWithLanguages> => {
        const clientsMap: Map<number, ClientWithLanguages> = new Map();
        rows.forEach((row: any) => {
            // If client does not exist, initialize
            if (!clientsMap.get(row.id)) {
                clientsMap.set(row.id, {
                    id: row.id,
                    firstName: row.firstName,
                    middleName: row.middleName,
                    lastName: row.lastName,
                    email: row.email,
                    dob: row.dob,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    fundingSource: row.fundingSource,
                    languages: [],
                });
            }

            // Add language if it exists
            if (row.languageName) {
                clientsMap.get(row.id)?.languages.push({
                    id: row.languageId,
                    name: row.languageName,
                    isPrimary: row.isPrimary,
                });
            }
        });
        return clientsMap;
    };
}

export const clientMapper = new ClientMapper();
