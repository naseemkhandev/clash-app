import { BoxesCore } from "@/components/ui/backgroundBoxes";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-dvh max-h-dvh overflow-hidden">
      <BoxesCore>
        <div className="!z-[1000] flex items-center justify-center h-dvh">
          <Outlet />
        </div>
      </BoxesCore>
    </div>
  );
};

export default AuthLayout;
