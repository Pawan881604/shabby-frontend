import React from "react";
import Customer from "components/dashboard/customer/Customer";
import { config } from "config";
export const metadata = { title: `Customer | ${config.site.name}` };

const Page = () => {
  return <Customer />;
};

export default Page;
