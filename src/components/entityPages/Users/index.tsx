import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { TbPencil, TbHammer, TbHammerOff } from "react-icons/tb";

import type { User } from "../../../types/user";
import { useFetchUsers, usePatchUserBan } from "../../../hooks/useUsers";
import { useNameFilter } from "../../../hooks/useNameFilter";
import EntityPage from "../EntityPage";
import UserForm from "../../forms/UserForm";
import DataTable from "../../DataTable";
import Filters from "../../filters/Filters";
import NameFilter from "../../filters/NameFilter";

const columnHelper = createColumnHelper<User>();

function Users() {
  const { data: users = [], isFetching, isError, error } = useFetchUsers();

  const { nameFilter, setNameFilter, columnFilters, setColumnFilters } =
    useNameFilter();

  const { mutate: updateUserBan } = usePatchUserBan();

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
      }),
      columnHelper.accessor("banned", {
        header: "Banned",
        cell: ({ row }) => (row.original.banned ? "✅ Yes" : "❌ No"),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const user = row.original;

          if (editingUserId === user.id) {
            return <></>;
          }

          return (
            <div>
              <button onClick={() => setEditingUserId(user.id)}>
                <TbPencil />
              </button>
              <button
                onClick={() =>
                  updateUserBan({ id: user.id, banned: !user.banned })
                }
              >
                {user.banned ? <TbHammerOff /> : <TbHammer />}
              </button>
            </div>
          );
        },
      }),
    ],
    [editingUserId, updateUserBan]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { columnFilters, sorting },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <EntityPage
      heading="Users"
      FormComponent={UserForm}
      isFetching={isFetching}
      isError={isError}
      error={error}
      filters={
        <Filters>
          <NameFilter value={nameFilter} onChange={setNameFilter} />
        </Filters>
      }
    >
      <DataTable
        table={table}
        renderEditForm={(user) =>
          editingUserId === user.id ? (
            <tr>
              <td colSpan={columns.length}>
                <UserForm user={user} onClose={() => setEditingUserId(null)} />
              </td>
            </tr>
          ) : null
        }
      />
    </EntityPage>
  );
}

export default Users;
