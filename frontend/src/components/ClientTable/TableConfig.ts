import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Client } from '@src/types';

export const columns = useMemo<MRT_ColumnDef<Client>[]>(
  () => [
    {
      accessorKey: 'name.firstName', //access nested data with dot notation
      header: 'First Name',
      size: 150,
    },
    {
      accessorKey: 'name.lastName',
      header: 'Last Name',
      size: 150,
    },
    {
      accessorKey: 'address', //normal accessorKey
      header: 'Address',
      size: 200,
    },
    {
      accessorKey: 'city',
      header: 'City',
      size: 150,
    },
    {
      accessorKey: 'state',
      header: 'State',
      size: 150,
    },
  ],
  [],
);
