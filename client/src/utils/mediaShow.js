export const imageShow = (src, theme) => {
  return (
    <img
      src={src}
      className="img-thumbnail"
      alt="uploaded pics"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};
