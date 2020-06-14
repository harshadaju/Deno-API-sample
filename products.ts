import { IProduct } from "./types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let products: IProduct[] = [
  {
    id: "1",
    name: "product 1",
    description: "sample product 1",
    price: 29.99,
  },
  {
    id: "2",
    name: "product 2",
    description: "sample product 2",
    price: 29.99,
  },
  {
    id: "3",
    name: "product 3",
    description: "sample product 3",
    price: 29.99,
  },
  {
    id: "4",
    name: "product 4",
    description: "sample product 4",
    price: 29.99,
  },
];

// @desc get all products
// GET /api/v1/products/getProducts
let getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc get  product
// GET /api/v1/products/getProduct/:id
let getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: IProduct | undefined = products.find((p) => p.id == params.id);
  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Product not found",
    };
  }
};

// @desc Add  product
// POST /api/v1/products/AddProduct
let addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No Data found",
    };
  } else {
    const product: IProduct = await body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
      msg: "Successfully added.",
    };
  }
};

// @desc update  product
// PUT /api/v1/products/updateProduct/:id
let updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: IProduct | undefined = products.find((p) =>
    p.id === params.id
  );
  if (product) {
    const body = await request.body();
    const productToChange: {
      name?: string;
      description?: string;
      price?: number;
    } = await body.value;
    products = products.map((p) =>
      p.id === params.id ? { ...p, ...productToChange } : p
    );
    response.status = 201;
    response.body = {
      success: true,
      msg: "Product Updated successfully.",
      data: product,
    };
  } else {
    response.status = 401;
    response.body = {
      success: false,
      msg: "Product not found.",
    };
  }
};

// @desc delete  product
// DELETE /api/v1/products/deleteProduct/:id
let deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: IProduct | undefined = products.find((p) =>
    p.id === params.id
  );
  if (product) {
    products = products.filter((p) => p.id != params.id);
    response.status = 201;
    response.body = {
      success: true,
      msg: `${product.name} successfully deleted.`,
    };
  } else {
    response.status = 401;
    response.body = {
      success: false,
      msg: "Product not found.",
    };
  }
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
