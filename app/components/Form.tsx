"use client";
import Link from "next/link";
import React, { FormEvent, SyntheticEvent } from "react";

interface IFormProps {
  onSubmit: (ev: SyntheticEvent, options: {}) => void;
  submitMethod: "POST" | "GET";
  requiredFields?: Array<string>;
  children?: JSX.Element | JSX.Element[];
  action?: string;
  fluid?: boolean;
}

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    props.onSubmit(ev, {
      action: props.action,
      method: props.submitMethod || "POST",
    });
  };

  return (
    <form
      action={props.action || ""}
      onSubmit={handleSubmit}
      className="grid gap-1 grid-cols-1 p-2 h-full bg-surface rounded-lg"
    >
      {props.children}
    </form>
  );
};

export { Form };
