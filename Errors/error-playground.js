const sum = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Arguments must be of type Number.");
  }
  if (a && b) {
    return a + b;
  }
  throw new Error("Invalid arguments");
};

try {
  console.log(sum(1, "b"));
} catch (error) {
  console.log("Error occured!");
  // console.log(error);
}

console.log("This works.");
