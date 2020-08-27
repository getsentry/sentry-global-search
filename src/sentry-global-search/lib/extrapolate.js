const extrapolate = (str, separator) => {
  const segments = str.split(separator).filter(Boolean);
  const fragments = segments.map((segment, i, array) =>
    array.slice(0, i + 1).join(separator)
  );
  return fragments;
};

export default extrapolate;
