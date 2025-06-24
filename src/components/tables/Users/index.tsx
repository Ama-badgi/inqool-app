import { useFetchUsers } from "../../../hooks/useUsers";
import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "../../../types/user";
import DataTable from "../DataTable";
import NavigationHeader from "../../NavigationHeader";
import UserForm from "../../forms/UserForm";
import { useState } from "react";

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
];

function Users() {
  const [showForm, setShowForm] = useState(false);
  const { data: users = [], isFetching, isError, error } = useFetchUsers();

  return (
    <>
      <NavigationHeader heading="Users" />
      <button onClick={() => setShowForm(true)}>+</button>
      {showForm && <UserForm onClose={() => setShowForm(false)} />}
      <DataTable
        data={users}
        columns={columns}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </>
  );
}

export default Users;
