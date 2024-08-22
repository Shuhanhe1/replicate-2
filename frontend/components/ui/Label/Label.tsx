import { cx } from "class-variance-authority";
import { FC, HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLLabelElement> {
  children?: ReactNode;
}

export const Label: FC<Props> = ({ children, className }) => {
  return (
    <label className={cx("block text-sm font-medium", className)}>
      {children}
    </label>
  );
};
