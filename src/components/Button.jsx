function Button({ id, buttonName, buttonColor, handleClick, disabled ,borderRadius}) {
  return (
    <div className="d-grid mb-1">
      <button
        id={id}
        className={`btn btn-${buttonColor}`}
        onClick={handleClick}
        disabled={disabled}
        style={{borderRadius:borderRadius}}
      >
        {buttonName}
      </button>
    </div>
  );
}

export default Button;
