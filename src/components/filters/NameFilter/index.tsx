type NameFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

function NameFilter({ value, onChange }: NameFilterProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Filter by name"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default NameFilter;
