import React, { useMemo } from 'react';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useQuery } from '@tanstack/react-query';
import { getClients } from '@src/api/clientService';
import { Client, ClientLanguage } from '@src/types';

export const ClientTable: React.FC = () => {
  // Define columns with useMemo
  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 80,
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
        size: 80,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 80,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 80,
      },
      {
        accessorKey: 'dob',
        header: 'Date of Birth',
        size: 50,
      },
      {
        accessorKey: 'fundingSource',
        header: 'Funding Source',
        size: 50,
      },
      {
        accessorFn: (client: Client) => {
          const primaryLanguage = client.languages.find(
            (language) => !!language.isPrimary,
          );
          return primaryLanguage?.name || '';
        },
        header: 'Primary Language',
        size: 50,
      },
    ],
    [],
  );

  // Fetch client data using react-query
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: getClients,
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  // Ensure data is structured correctly
  const clientData = data?.data?.responseObject || [];

  console.log(clientData);

  // Render the Material React Table component
  return (
    <MaterialReactTable
      columns={columns}
      data={clientData} // Pass the data array to the table
    />
  );
};
