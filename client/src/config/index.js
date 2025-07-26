export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter Your user-name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your user-email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    type: "password",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Select your role",
    options: [
      { label: "Buyer", value: "buyer" },
      { label: "Seller", value: "seller" },
    ],
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    placeholder: "Enter product description",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    options: [
      { value: "electronics", label: "Electronics" },
      { value: "clothing", label: "Clothing" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    type: "select",
    placeholder: "Select brand",
    options: [
      { value: "samsung", label: "Samsung" },
      { value: "apple", label: "Apple" },
    ],
  },
  {
    label: "Price",
    name: "price",
    type: "text",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    type: "text",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    type: "text",
    placeholder: "Enter total stock",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};
