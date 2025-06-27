import { useState } from "react";
import NavigationHeader from "../../NavigationHeader";

type EntityPageProps = {
  heading: string;
  FormComponent: React.ComponentType<{ onClose: () => void }>;
  filters?: React.ReactNode;
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
  filters,
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
          {showFilters && filters}
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
