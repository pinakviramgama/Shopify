import { filterOptions } from "@/config";
import { Separator } from "@radix-ui/react-select";
import { Fragment } from "react";

function ProductFilter() {
  return (
    <div className="bg-white rounded shadow border p-4" style={{minHeight:"100vh",width:"330px"}}>
      <h2 className="fs-5 fw-semibold border-bottom pb-2 mb-4">Filters</h2>

      {/* Category in columns */}
      {filterOptions["category"] && (
        <>
          <h5 className="fw-bold mb-3">Category</h5>
          <div className="row mb-4">
            {filterOptions["category"].map((option, index) => {
              const id = `category-${option.id}-${index}`;
              return (
                <div className="col-md-4" key={id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={id}
                    />
                    <label className="form-check-label small" htmlFor={id}>
                      {option.label}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <Separator />

      {/* Other filters like brand */}
      {Object.keys(filterOptions)
        .filter((key) => key !== "category")
        .map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="mb-4">
              <h5 className="fw-bold mb-3">{keyItem.charAt(0).toUpperCase() + keyItem.slice(1)}</h5>
              <div className="d-flex flex-column gap-2">
                {filterOptions[keyItem].map((option, index) => {
                  const id = `${keyItem}-${option.id}-${index}`;
                  return (
                    <div className="form-check" key={id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={id}
                      />
                      <label className="form-check-label small" htmlFor={id}>
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
}

export default ProductFilter;
