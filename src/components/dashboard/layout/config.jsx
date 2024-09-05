import { paths } from "../../../paths";
export const navItems = [
  {
    key: "overview",
    title: "Overview",
    href: paths.dashboard.overview,
    icon: "chart-pie",
  },
  {
    key: "websites",
    title: "Add Sites",
    href: paths.dashboard.websites,
    icon: "chart-pie",
  },
  {
    key: "customers",
    title: "Customers",
    href: paths.dashboard.customers,
    icon: "users",
  },
  {
    key: "offers",
    title: "Offers",
    href: paths.dashboard.offers,
    icon: "users",
  },
  {
    key: "branch",
    title: "Branch",
    href: paths.dashboard.branch,
    icon: "plugs-connected",
  },
  {
    key: "users",
    title: "Users",
    href: paths.dashboard.users,
    icon: "users",
  },
  {
    key: "settings",
    title: "Settings",
    href: paths.dashboard.settings,
    icon: "gear-six",
  },
  {
    key: "error",
    title: "Error",
    href: paths.errors.notFound,
    icon: "x-square",
  },
];
