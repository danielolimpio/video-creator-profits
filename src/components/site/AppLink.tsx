import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  Omit<LinkProps, "to"> & { to: string };

/** Link wrapper that accepts computed string paths (locale-prefixed URLs). */
export function AppLink({ to, ...rest }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Link to={to as any} preload="intent" {...(rest as any)} />;
}
