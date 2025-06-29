import { useState } from "react";
import NavigationHeader from "../../NavigationHeader";

import "./style.css";

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

      {isError && <p className="message">Error: {error?.message}</p>}
      {isFetching && <p className="message">Loading...</p>}

      {!isFetching && !isError && (
        <div className="entity-page">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="entity-page__filters-button"
          >
            Filters
          </button>
          {showFilters && filters}
          {children}
          {showForm ? (
            <FormComponent onClose={() => setShowForm(false)} />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="entity-page__add-entity-button"
            >
              +
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default EntityPage;
