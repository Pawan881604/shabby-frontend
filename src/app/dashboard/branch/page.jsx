import React from "react";
import Branch from "components/dashboard/branch/Branch";
import { config } from "config";
export const metadata = { title: `Branch | ${config.site.name}` };
const Page = () => {
 
  return (
   <Branch/>
  );
};

export default Page;
