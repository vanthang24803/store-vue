import { h } from "vue";
import CellAction from "../CellAction.vue";
import { formatDate } from "@/lib/ranking";
import { price } from "@/lib/format";
import Status from "./Status.vue";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) =>
      h("span", { class: "line-clamp-1 w-[220px]" }, row.original.id),
  },
  {
    accessorKey: "name",
    header: "Customer",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) =>
      h("span", { class: "line-clamp-1 w-[200px]" }, row.original.address),
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => h(Status, { status: row.original.status }),
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    cell: ({ row }) => h("span", `${price(row.original.totalPrice)}₫`),
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
        method: "orders",
      }),
  },
];
