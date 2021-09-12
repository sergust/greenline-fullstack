const customStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? '#00cea3'
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ?  '#00cea3'
        : data.color,
      cursor: "pointer",
      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : '#05a684'),
      },
    };
  },
};

export default customStyles;
