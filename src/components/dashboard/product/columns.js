import { format, parseISO } from "date-fns";
import { h } from "vue";
import CellAction from "../CellAction.vue";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) =>
      h("span", { class: "mx-4" }, row.original.options.length),
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
      }),
  },
];

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:ss");
};
