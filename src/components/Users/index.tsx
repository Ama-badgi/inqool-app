import { useFetchUsers } from "../../hooks/useUsers";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router";
import type { User } from "../../types/user";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("banned", {
    header: "Banned",
    cell: (info) => (info.getValue() ? "✅ Yes" : "❌ No"),
    footer: (info) => info.column.id,
  }),
];

function Users() {
  const { data: users = [], isFetching, isError, error } = useFetchUsers();

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isFetching) return <>Loading...</>;
  if (isError) return <>Error: {error.message}</>;

  return (
    <>
      {" "}
      <Link to="/">Home</Link>
      <h1>Users</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
