import { config } from "config";
import { Dashboard } from "components/dashboard/overview/Dashboard";
export const metadata = { title: `Shabby Dashboard | ${config.site.name}` };
export default function Page() {
  return <Dashboard />;
}
