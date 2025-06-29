import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { TbPencil } from "react-icons/tb";

import type { Animal } from "../../../types/animal";
import { useFetchAnimals } from "../../../hooks/useAnimals";
import { useNameFilter } from "../../../hooks/useNameFilter";
import EntityPage from "../EntityPage";
import AnimalForm from "../../forms/AnimalForm";
import DataTable from "../../DataTable";
import Filters from "../../filters/Filters";
import NameFilter from "../../filters/NameFilter";

const columnHelper = createColumnHelper<Animal>();

function Animals() {
  const { data: animals = [], isFetching, isError, error } = useFetchAnimals();

  const { nameFilter, setNameFilter, columnFilters, setColumnFilters } =
    useNameFilter();

  const [editingAnimalId, setEditingAnimalId] = useState<string | null>(null);
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

          if (editingAnimalId === animal.id) {
            return <></>;
          }

          return (
            <div>
              <button onClick={() => setEditingAnimalId(animal.id)}>
                <TbPencil />
              </button>
            </div>
          );
        },
      }),
    ],
    [editingAnimalId]
  );

  const table = useReactTable({
    data: animals,
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
      heading="Animals"
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
      <DataTable
        table={table}
        renderEditForm={(animal) =>
          editingAnimalId === animal.id ? (
            <tr>
              <td colSpan={columns.length}>
                <AnimalForm
                  animal={animal}
                  onClose={() => setEditingAnimalId(null)}
                />
              </td>
            </tr>
          ) : null
        }
      />
    </EntityPage>
  );
}

export default Animals;
