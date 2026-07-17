function Button({ id, buttonName, buttonColor, handleClick, disabled ,borderRadius,dataBsToggle,dataBsTarget}) {
  return (
    <div className="d-grid mb-1">
      <button
        id={id}
        className={`btn btn-${buttonColor}`}
        onClick={handleClick}
        disabled={disabled}
        style={{borderRadius:borderRadius}}
        data-bs-toggle={dataBsToggle}
        data-bs-target = {dataBsTarget}
      >
        {buttonName}
      </button>
    </div>
  );
}

export default Button;
