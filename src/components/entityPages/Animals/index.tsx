import { useFetchAnimals } from "../../../hooks/useAnimals";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Animal } from "../../../types/animal";
import DataTable from "../../DataTable";
import AnimalForm from "../../forms/AnimalForm";
import EntityPage from "../EntityPage";
import { TbPencil } from "react-icons/tb";
import { useNameFilter } from "../../../hooks/useNameFilter";
import Filters from "../../filters/Filters";
import NameFilter from "../../filters/NameFilter";

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

  const { nameFilter, setNameFilter, columnFilters, setColumnFilters } =
    useNameFilter();

  const table = useReactTable({
    data: animals,
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
      FormComponent={AnimalForm}
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

export default Animals;
