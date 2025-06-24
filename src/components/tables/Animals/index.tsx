import { useFetchAnimals } from "../../../hooks/useAnimals";
import { createColumnHelper } from "@tanstack/react-table";
import type { Animal } from "../../../types/animal";
import DataTable from "../DataTable";
import NavigationHeader from "../../NavigationHeader";
import { useState } from "react";
import AnimalForm from "../../forms/AnimalForm";
import Filters from "../../Filters";

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
];

function Animals() {
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { data: animals = [], isFetching, isError, error } = useFetchAnimals();

  return (
    <>
      <NavigationHeader heading="Animals" />
      <button onClick={() => setShowFilters(!showFilters)}>Filters</button>
      {showFilters && <Filters />}
      <DataTable
        columns={columns}
        data={animals}
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
      {showForm ? (
        <AnimalForm onClose={() => setShowForm(false)} />
      ) : (
        <button onClick={() => setShowForm(true)}>+</button>
      )}
    </>
  );
}

export default Animals;
