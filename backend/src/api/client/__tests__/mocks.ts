import type { Client } from '@/api/client/clientModel';

export const mockClients: Client[] = [
    {
        id: 1,
        first_name: 'John',
        middle_name: 'Doe',
        last_name: 'Smith',
        email: 'john@example.com',
        dob: '1990-01-01',
        funding_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 1,
        first_name: 'Jane',
        middle_name: 'Doe',
        last_name: 'Smith',
        email: 'jane@example.com',
        dob: '1990-01-01',
        funding_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
