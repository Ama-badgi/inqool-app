import { useFetchAnimals } from "../../hooks/useAnimals";
import { createColumnHelper } from "@tanstack/react-table";
import type { Animal } from "../../types/animal";
import DataTable from "../DataTable";

const columnHelper = createColumnHelper<Animal>();
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: "Age",
    footer: (info) => info.column.id,
  }),
];

function Animals() {
  const { data: animals = [], isFetching, isError, error } = useFetchAnimals();

  return (
    <DataTable
      heading="Animals"
      columns={columns}
      data={animals}
      isFetching={isFetching}
      isError={isError}
      error={error}
    />
  );
}

export default Animals;
