import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { LOCALES, type Locale } from "@/content/types";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!LOCALES.includes(params.lang as Locale)) throw notFound();
  },
  component: () => <Outlet />,
});
