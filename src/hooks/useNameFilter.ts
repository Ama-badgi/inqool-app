import { useState, useEffect } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";

export function useNameFilter() {
  const [nameFilter, setNameFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== "name"),
      ...(nameFilter ? [{ id: "name", value: nameFilter }] : []),
    ]);
  }, [nameFilter]);

  return { nameFilter, setNameFilter, columnFilters, setColumnFilters };
}
