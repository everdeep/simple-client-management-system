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
                    first_name: row.first_name,
                    middle_name: row.middle_name,
                    last_name: row.last_name,
                    email: row.email,
                    dob: row.dob,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    funding_source: row.funding_source,
                    languages: [],
                });
            }

            // Add language if it exists
            if (row.language_name) {
                clientsMap.get(row.id)?.languages.push({
                    id: row.language_id,
                    name: row.language_name,
                    is_primary: row.is_primary,
                });
            }
        });
        return clientsMap;
    };
}

export const clientMapper = new ClientMapper();
