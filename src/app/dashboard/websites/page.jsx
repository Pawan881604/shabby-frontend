import React from "react";
import Websites from "components/dashboard/websites/Websites";
import { config } from "config";
export const metadata = { title: `Website | ${config.site.name}` };
const Page = () => {
  return <Websites />;
};

export default Page;
