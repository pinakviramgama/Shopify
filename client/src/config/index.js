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
