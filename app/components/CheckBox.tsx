import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Label } from "./Label";

interface ICheckBoxProps {
  id: string;
  required?: boolean;
  label: string;
  checked?: boolean;
  checkboxRef?: React.RefObject<HTMLInputElement>;
  onChange?: (checked:boolean) => void;
}

const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  const [value, setValue] = useState("");
  let inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  if (props.checkboxRef) inputRef = props.checkboxRef;

  useEffect(() => {
    if (inputRef.current && props.checked) {
      inputRef.current.checked = props.checked;
      setValue(props.checked.toString());
    }
  }, [props.checked]);

  const handleChange = (el: SyntheticEvent<HTMLInputElement>) => {
    const checkbox = el.target as HTMLInputElement;
    setValue(checkbox.checked.toString());
    props.onChange && props.onChange(checkbox.checked);
  };

  return (
    <div className="grid grid-flow-col auto-cols-max gap-1 items-center">
      <Label for={props.id.toString()} name={props.label} />
      <div className="grid">
        <input
          type="checkbox"
          id={props.id}
          name={props.id}
          className="relative z-10 peer w-2 h-2 appearance-none  checked:border-primary border-onSurface outline-none bg-transparent rounded focus:ring-yellow-500"
          required={props.required}
          ref={inputRef}
          onChange={handleChange}
          value={value}
        />
        <svg
          className="
      absolute 
      w-[1.5rem] h-[1.5rem] self-center justify-self-center text-primary
      hidden peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  );
};

export { CheckBox };
