async function get(route) {
  return await fetch(`https://fakestoreapi.com/${route}`)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

async function post(route, product) {
  return await fetch(`https://fakestoreapi.com/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

async function del(route) {
  return await fetch(`https://fakestoreapi.com/${route}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export const ApiCall = {
  get,
  post,
  del,
};
