import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <div className="bg-Background-50 font-inter h-screen leading-normal flex flex-col items-center text-center overflow-auto">
      <div className="flex h-[8%] lg:h-[9%] xl::h-[7%] w-full bg-text-Primary p-2 mb-h2">
        <img src="/TechnionLogo.svg" alt="logo" className="w-12 h-12" />
        <div className="flex flex-col justify-center lg:justify-start text-start  text-Background-50">
          <span className="text-h2-lg">Technion Research Study</span>
          <span className="text-h2-sm text-neutral-200">
            Human-Computer Interaction Lab
          </span>
        </div>
      </div>

      {/* Children */}
      <Outlet />
    </div>
  );
}
