import { Button } from "../UI/button";
import { Input } from "../UI/input";
import { Label } from "../UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/select";
import { Textarea } from "../UI/textarea";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || "";

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              })
            }
          />
        );

      case "textarea":
        return (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) =>
              setFormData({
                ...formData,
                [controlItem.name]: val,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={controlItem.label}
              />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div className="grid w-full gap-1.5" key={item.name}>
            <Label className="mb-1" htmlFor={item.name}>
              {item.label}
            </Label>
            {renderInputsByComponentType(item)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
