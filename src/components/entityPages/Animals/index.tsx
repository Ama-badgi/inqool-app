import { useFetchAnimals } from "../../../hooks/useAnimals";
import { createColumnHelper } from "@tanstack/react-table";
import type { Animal } from "../../../types/animal";
import DataTable from "../../DataTable";
import AnimalForm from "../../forms/AnimalForm";
import EntityPage from "../EntityPage";
import { TbPencil } from "react-icons/tb";

const columnHelper = createColumnHelper<Animal>();
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("type", {
    header: "Type",
  }),
  columnHelper.accessor("age", {
    header: "Age",
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const animal = row.original;
      return (
        <div>
          <button>
            <TbPencil />
          </button>
        </div>
      );
    },
  }),
];

function Animals() {
  const { data: animals = [], isFetching, isError, error } = useFetchAnimals();

  return (
    <>
      <EntityPage
        heading="Animals"
        FormComponent={AnimalForm}
        children={<DataTable data={animals} columns={columns} />}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </>
  );
}

export default Animals;
