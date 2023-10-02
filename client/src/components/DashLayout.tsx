import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import DashBody from "./DashBody";
import { useState } from "react";

function DashLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuState() {
    setIsMenuOpen((state) => !state);
  }
  return (
    <div className="flex flex-col justify-between h-screen">
      <DashHeader isMenuOpen={isMenuOpen} onMenuOpen={handleMenuState} />
      <DashBody>
        <main className="flex-grow mb-6">
          <Outlet />
        </main>
      </DashBody>
      <DashFooter isMenuOpen={isMenuOpen} onMenuOpen={handleMenuState} />
    </div>
  );
}

export default DashLayout;
