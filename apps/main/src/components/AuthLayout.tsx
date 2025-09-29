import { Outlet } from "react-router-dom";

import bgCAM from "../assets/cam.jpg";
import logo from "../assets/valuejet-logo.png";
// import plane one and two
import planeOne from "../assets/airplane.png";
import planeTwo from "../assets/airplane2.png";

export function AuthLayout() {
  return (
    <div className="h-screen flex md:overflow-y-hidden">
      {/* Left side - Background */}
      <div
        className="w-[40%] relative bg-cover bg-center bg-no-repeat md:flex  justify-center items-end pb-16 hidden"
        style={{ backgroundImage: `url(${bgCAM})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Corporate Account Module Card */}
        <div className=" w-[90%] relative ">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-[4px] border-[#3D12337A]/20">
            <h2 className="text-white text-2xl font-bold mb-2">
              Corporate Account Module
            </h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Your central hub for managing ValueJet corporate bookings and
              account balances
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="md:w-[60%] w-full relative flex flex-col items-center">
        <div className="w-full">
          {/* Logo */}
          <div className="text-center p-4 bg-white h-[80px] relative overflow-hidden shadow-xl flex items-center">
            <img src={logo} alt="" className="object-fit h-[70px] w-[100px]" />
          </div>
          <div className="bg-[var(--brand-light-color)] h-[calc(100vh-80px)] relative">
            {/* Decorative shapes */}
            <div className="absolute -top-[4rem] -right-[5rem] z-[1] ">
              <img src={planeOne} alt="" className="size-80" />
            </div>
            <div className="absolute -bottom-[5rem] -left-[4rem] z-[1] ">
              <img src={planeTwo} alt="" className="size-80" />
            </div>
            <div className=" bg-[#e9d9e6]/10 backdrop-blur-sm h-[60px]  md:h-[80px] flex items-center justify-center "></div>
            {/* Auth Form */}
            <div className=" p-4 flex justify-center items-center md:h-[calc(100vh-240px)]">
              <div className="bg-white w-[90%] p-8 rounded-xl shadow-sm  outline-[#e9d9e6] outline-6 max-w-[400px]">
                <Outlet />
              </div>
            </div>

            {/* Footer */}
            <div className=" bg-[#e9d9e6]/10 backdrop-blur-sm h-[60px]  md:h-[80px] flex items-center justify-center ">
              <p className="text-gray-500 text-sm">Value Jet. © 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
