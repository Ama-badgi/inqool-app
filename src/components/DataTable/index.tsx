import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import React from "react";

import "./style.css";

type DataTableProps<T> = {
  table: Table<T>;
  renderEditForm?: (row: T) => React.ReactNode;
};

function DataTable<T>({ table, renderEditForm }: DataTableProps<T>) {
  return (
    <>
      <div className="data-table-wrapper">
        <table className="data-table">
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
              <React.Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {renderEditForm && renderEditForm(row.original)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
