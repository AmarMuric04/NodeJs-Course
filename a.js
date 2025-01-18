const ts = [1, 2, 3, 4, 5, 6, 7, -1, -0.5, 0.5];

console.log(
  ts.includes(Math.min(...ts.map(Math.abs)) * -1)
    ? ts.includes(Math.abs(Math.min(...ts.map(Math.abs))))
      ? Math.abs(Math.min(...ts.map(Math.abs)))
      : Math.min(...ts.map(Math.abs)) * -1
    : Math.min(...ts.map(Math.abs))
);
