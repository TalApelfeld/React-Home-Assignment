import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <div className="bg-green-400 font-inter h-screen">
      <Outlet />
    </div>
  );
}
