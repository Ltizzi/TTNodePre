import { ApiCall } from "./ApiCall.js";

console.clear();
console.log("\nPRE-ENTREGA para curso Backend-NodeJS de Talento Tech");
console.log("\n\npor Leonardo Terlizzi\n\n");

checkNodeVersion();

const args = process.argv.slice(2);
const hasArgs = args && args.length > 0;

let errorMsg = "";

if (!hasArgs) {
  showNoArgsMsg();
}

if (args[0].toLowerCase() == "help") {
  console.log("============================\n");
  console.log("\nAyuda:\n");
  console.log(
    "El primer argumento tiene q ser un metodo HTTP válido (GET, PUT, POST, DELETE)\n"
  );
  console.log("\nEl segundo tiene q ser la ruta/endpoint deseado");
}

const httpMethod = args[0];
const route = args[1] ? args[1] : "products";

if (httpMethod.toLowerCase() === "get") {
  const data = await ApiCall.get(route);
  console.log(
    data.length > 1
      ? "Products:\n"
      : "Product with id nº " + route.split("/")[1] + " "
  );
  console.log(data);
} else if (httpMethod.toLowerCase() === "post") {
  const newProduct = getProductFromArgs(args);

  if (!newProduct) {
    console.log("\n\nError creando nuevo producto:\n\n" + errorMsg);
    process.exit(0);
  }

  const data = await ApiCall.post(route, newProduct);
  console.log("New Product\n");
  console.log(data);
} else if (httpMethod.toLowerCase() === "delete") {
  const response = await ApiCall.del(route);
  console.log("\n\nPRODUCTO BORRADO:\n\n");
  console.log(response);
} else if (
  httpMethod.toLowerCase() === "put" ||
  httpMethod.toLowerCase() === "patch"
) {
  console.log("\n\n\n Dicho método no hay sido aún implementado");
} else {
  console.log("Argumentos inválidos: ");
  console.log(`\n\t${args}\n\n`);
  showNoArgsMsg();
}

function getProductFromArgs(args) {
  const newProduct = {
    title: "",
    price: 0,
    category: "",
  };

  if (args[1].toLowerCase() === "products") {
    if (args[2] && args[2].length > 0) {
      newProduct.title = args[2];
    } else errorMsg += "\tInvalid product title.\n\n";

    if (args[3] && args[3] > 0) {
      newProduct.price = args[3];
    } else errorMsg += "\tInvalid Price (must be a number greater than 0).\n\n";
    if (args[4] && args[4].length > 0) {
      newProduct.category = args[4];
    } else errorMsg += "\tInvalid product category.\n\n";
  }
  if (errorMsg.length > 0) return null;
  else return newProduct;
}

function showNoArgsMsg() {
  console.log(
    "-------------------------------------------------------------\n\nEjecute 'npm run start -- help' para más información\n\n-------------------------------------------------------------\n"
  );
  process.exit(0);
}

function checkNodeVersion() {
  console.log("Chequeando versión de node...");
  const version = process.versions.node.split(".")[0];
  if (version >= 18) {
    console.log("\nVersión de node: v" + process.versions.node + "\n\n");
    return;
  } else {
    console.log(
      "\n\n\tERROR!! este script necesita Node v18 o superior para correr.\n\tActualice para continuar!.\n\n"
    );
    process.exit(0);
  }
}
