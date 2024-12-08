import React, { FC, PropsWithChildren } from "react";
import SideNav from "../components/SideNav";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="w-full flex-none md:w-64 bg-slate-700">
        <SideNav />
      </aside>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default DashboardLayout;
