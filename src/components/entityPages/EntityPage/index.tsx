import { useState } from "react";
import NavigationHeader from "../../NavigationHeader";
import Filters from "../../Filters";

type EntityPageProps = {
  heading: string;
  FormComponent: React.ComponentType<{ onClose: () => void }>;
  children: React.ReactNode;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
};

function EntityPage({
  heading,
  FormComponent,
  children,
  isFetching,
  isError,
  error,
}: EntityPageProps) {
  if (isError) return <>Error: {error?.message}</>;

  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <NavigationHeader heading={heading} />

      {isError && <p>Error: {error?.message}</p>}
      {isFetching && <p>Loading...</p>}

      {!isFetching && !isError && (
        <>
          <button onClick={() => setShowFilters(!showFilters)}>Filters</button>
          {showFilters && <Filters />}
          {children}
          {showForm ? (
            <FormComponent onClose={() => setShowForm(false)} />
          ) : (
            <button onClick={() => setShowForm(true)}>+</button>
          )}
        </>
      )}
    </>
  );
}

export default EntityPage;
