import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

type DataTableProps<T> = {
  heading: string;
  data: T[];
  columns: ColumnDef<T, any>[];
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
};

function DataTable<T>({
  heading,
  data,
  columns,
  isFetching,
  isError,
  error,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isFetching) return <>Loading...</>;
  if (isError) return <>Error: {error?.message}</>;

  return (
    <>
      <Link to="/">Home</Link>
      <h1>{heading}</h1>
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

export default DataTable;
