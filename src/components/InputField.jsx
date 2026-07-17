function InputField({ label, placeholder, id, type, ref }) {
  return (
    <div className="mb-3">
      <label className="form-label mb-0" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-control"
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
