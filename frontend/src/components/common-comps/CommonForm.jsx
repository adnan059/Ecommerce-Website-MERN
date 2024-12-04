import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const CommonForm = ({ formControls }) => {
  const renderInputsByComponentType = (getControlItem) => {};

  return (
    <form action="">
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem?.name}>
            <Label className="mb-1">{controlItem?.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button></Button>
    </form>
  );
};

export default CommonForm;
