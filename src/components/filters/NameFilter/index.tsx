type NameFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

function NameFilter({ value, onChange }: NameFilterProps) {
  return (
    <div className="name-filter">
      <input
        type="text"
        value={value}
        placeholder="Filter by name"
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <button onClick={() => onChange("")}>x</button>
    </div>
  );
}

export default NameFilter;
