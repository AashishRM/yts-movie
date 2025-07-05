import { HeaderBar } from "../components/partials/HeaderBar";
import { FooterBar } from "../components/partials/FooterBar";
import { LandingRoutes } from "../routes/LandingRoutes";

export const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderBar />

      <div className="flex-1 pt-[70px]">
        <LandingRoutes />
      </div>

      <FooterBar />
   </div>
  );
};
