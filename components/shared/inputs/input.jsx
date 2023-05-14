export default function Input({ placeholder, value, setValue }) {
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <input
      className="rounded-md p-2 shadow"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
