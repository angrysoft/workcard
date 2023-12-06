"use client";
import Link from "next/link";
import { useCallback } from "react";

interface IButtonProps {
  type?: "button" | "submit" | "reset";
  appearance?: string;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  to?: string;
}

const Button = (props: IButtonProps) => {
  const handleClick = useCallback(
    () => props.onClick && props.onClick(),
    [props],
  );

  let classes: string[] = [
    "h-[56px]",
    "min-w-[56px]",
    "p-05",
    "cursor-pointer",
    "font-bold",
    "text-center",
    "active:animate-btnClick",
    "transition-all-500",
    "transition-all",
    "duration-500",
    "disabled:opacity-50",
    "disabled:hover:shadow-none",
    "break-words",
    "grid place-content-center",
  ];

  let rounded = "rounded";
  let borders = "border border-primary";

  props.primary && (classes = [...classes, "bg-primary", "text-onPrimary"]);
  switch (props.appearance) {
    case "circle": {
      rounded = "rounded-full";
      break;
    }
    case "text": {
      borders = "border-0";
      break;
    }
  }

  classes.push(rounded);
  classes.push(borders);
  if (props.to) {
    return (
      <Link className={classes.join(" ")} href={props.to}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={classes.join(" ")}
      onClick={handleClick}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export { Button };
