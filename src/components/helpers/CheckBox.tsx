export default function Checkbox(props: any) {
  const { id, name, handleChange, checked, className } = props;

  return (
    <div>
      <input
        className={className}
        id={id}
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={checked}
      />
    </div>
  );
}
