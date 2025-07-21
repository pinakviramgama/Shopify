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
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="space-y-1">
          <Label htmlFor={controlItem.name}>{controlItem.label}</Label>

          {controlItem.type === "text" && (
            <Input
              id={controlItem.name}
              type="text"
              placeholder={controlItem.placeholder}
              value={formData[controlItem.name] || ""}
              onChange={(e) => handleChange(controlItem.name, e.target.value)}
            />
          )}

          {controlItem.type === "email" && (
            <Input
              id={controlItem.name}
              type="email"
              placeholder={controlItem.placeholder}
              value={formData[controlItem.name] || ""}
              onChange={(e) => handleChange(controlItem.name, e.target.value)}
            />
          )}

          {controlItem.type === "password" && (
            <Input
              id={controlItem.name}
              type="password"
              placeholder={controlItem.placeholder}
              value={formData[controlItem.name] || ""}
              onChange={(e) => handleChange(controlItem.name, e.target.value)}
            />
          )}

          {controlItem.type === "textarea" && (
            <Textarea
              id={controlItem.name}
              placeholder={controlItem.placeholder}
              value={formData[controlItem.name] || ""}
              onChange={(e) => handleChange(controlItem.name, e.target.value)}
            />
          )}

          {controlItem.type === "select" && (
            <Select className="mb-4"
              onValueChange={(value) => handleChange(controlItem.name, value)}
              value={formData[controlItem.name] || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder={controlItem.placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {controlItem.options?.map((opt) =>
                  opt.value !== undefined && opt.label ? (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ) : null
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      ))}

      <Button type="submit" disabled={isBtnDisabled} className="w-full">
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
