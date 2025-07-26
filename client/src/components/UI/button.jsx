// components/UI/button.jsx
function Button({ children, className = "", ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export { Button };
