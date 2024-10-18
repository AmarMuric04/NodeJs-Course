const deleteProduct = () => {
  const prodId = this.parentNode.querySelector("[name=productId]").value;
  const csrf = this.parentNode.querySelector("[name=_csrf]").value;

  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
