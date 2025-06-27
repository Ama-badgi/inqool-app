import { useFetchUsers } from "../../../hooks/useUsers";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { User } from "../../../types/user";
import DataTable from "../../DataTable";
import UserForm from "../../forms/UserForm";
import EntityPage from "../EntityPage";
import { TbPencil, TbHammer, TbHammerOff } from "react-icons/tb";
import Filters from "../../filters/Filters";
import NameFilter from "../../filters/NameFilter";
import { useNameFilter } from "../../../hooks/useNameFilter";

const columnHelper = createColumnHelper<User>();
const columns = [
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
    cell: (info) => (info.getValue() ? "✅ Yes" : "❌ No"),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <button>
            <TbPencil />
          </button>
          <button>{user.banned ? <TbHammerOff /> : <TbHammer />}</button>
        </div>
      );
    },
  }),
];

function Users() {
  const { data: users = [], isFetching, isError, error } = useFetchUsers();

  const { nameFilter, setNameFilter, columnFilters, setColumnFilters } =
    useNameFilter();

  const table = useReactTable({
    data: users,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      <DataTable table={table} />
    </EntityPage>
  );
}

export default Users;
