import type { ClientWithLanguages } from '@/api/client/clientModel';

export const mockClients: ClientWithLanguages[] = [
    {
        id: 1,
        first_name: 'John',
        middle_name: 'Doe',
        last_name: 'Smith',
        email: 'john@example.com',
        dob: '1990-01-01',
        created_at: '2021-01-01',
        updated_at: '2021-01-01',
        funding_source: 'NDIS',
        languages: [
            {
                id: 1,
                name: 'English',
                is_primary: true,
            },
            {
                id: 2,
                name: 'Spanish',
                is_primary: false,
            },
        ],
    },
    {
        id: 2,
        first_name: 'Jane',
        middle_name: 'Doe',
        last_name: 'Smith',
        email: 'jane@example.com',
        dob: '1990-01-01',
        created_at: '2021-01-01',
        updated_at: '2021-01-01',
        funding_source: 'NDIS',
        languages: [
            {
                id: 3,
                name: 'French',
                is_primary: true,
            },
            {
                id: 1,
                name: 'English',
                is_primary: false,
            },
        ],
    },
];
