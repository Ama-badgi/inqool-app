import { useFetchUsers } from "../../../hooks/useUsers";
import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "../../../types/user";
import DataTable from "../../DataTable";
import UserForm from "../../forms/UserForm";
import EntityPage from "../EntityPage";
import { TbPencil, TbHammer, TbHammerOff } from "react-icons/tb";

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

  return (
    <>
      <EntityPage
        heading="Users"
        FormComponent={UserForm}
        children={<DataTable data={users} columns={columns} />}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </>
  );
}

export default Users;
