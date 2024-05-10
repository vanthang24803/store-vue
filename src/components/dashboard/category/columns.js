import { h } from 'vue';
import CellAction from '../CellAction.vue';
import { formatDate } from '@/lib/ranking';

export const columns = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'createAt',
    header: 'Date',
    cell: ({ row }) => h('span', formatDate(row.original.createAt)),
  },
  {
    id: 'actions',
    cell: ({ row }) =>
      h(CellAction, {
        id: row.original.id,
        method: 'categories',
      }),
  },
];
