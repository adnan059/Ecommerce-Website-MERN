import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonTxt,
  isBtnDisabled,
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;

    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            label={getControlItem.label}
            type={getControlItem.type}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]:
                  typeof event.target.value === "string"
                    ? event.target.value.toLowerCase()
                    : event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]:
                  typeof value === "string" ? value.toLowerCase() : value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem?.options && getControlItem?.options?.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            label={getControlItem.label}
            type={getControlItem.type}
            id={getControlItem.name}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value.toLowerCase(),
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            label={getControlItem.label}
            type={getControlItem.type}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]:
                  typeof event.target.value === "string"
                    ? event.target.value.toLowerCase()
                    : event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit} action="">
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem?.name}>
            <Label className="mb-1">{controlItem?.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonTxt || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
