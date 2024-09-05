import React from "react";
import Users from "components/dashboard/users/Users";
import { config } from "config";
export const metadata = { title: `Users | ${config.site.name}` };
const Page = () => {
  return <Users />;
};

export default Page;
