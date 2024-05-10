import { h } from "vue";
import CellAction from "../CellAction.vue";
import { formatDate } from "@/lib/ranking";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "shelfLife",
    header: "Expiry",
    cell: ({ row }) => h("span", formatDate(row.original.shelfLife)),
  },
  {
    accessorKey: "expire",
    header: "Expire",
  },
  {
    accessorKey: "createAt",
    header: "Date",
    cell: ({ row }) => h("span", formatDate(row.original.createAt)),
  },
  {
    id: "actions",
    cell: ({ row }) =>
      h(CellAction, {
        id: row.original.id,
        method: "vouchers",
      }),
  },
];
