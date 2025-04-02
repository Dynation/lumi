"use client";
import React from "react";
import CalendarPicker from "../components/calendar/CalendarPicker";
import MasterSwiper from "../components/masterswiper/MasterSwiper";


const UserDashboard: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-(--background-color) via-(--button-hover-color) to-(--background-color) text-[var(--text-color)] px-4 py-6">
      {/* Top Profile Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">dynazenklova</h1>
          <p className="text-sm">Dyna Zenklova</p>
        </div>
        <div className="flex gap-4">
          <button className="rounded-full bg-[var(--button-color)] px-4 py-1 text-sm">
            Редагувати
          </button>
          <button className="rounded-full bg-[var(--button-color)] px-4 py-1 text-sm">
            Поширити
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 flex justify-around text-center text-sm">
        <div>
          <p className="font-semibold">0</p>
          <p>дописи</p>
        </div>
        <div>
          <p className="font-semibold">0</p>
          <p>читачі</p>
        </div>
        <div>
          <p className="font-semibold">0</p>
          <p>відстежують</p>
        </div>
      </div>

      {/* Suggested Section */}
      <div className="mt-6 ">
        <h2 className="font-semibold text-lg">masters</h2>
<MasterSwiper
  selectedService={null} // Provide a value for selectedService
  onDetailsClick={(master) => {
    console.log("Master details clicked:", master);
  }}
/>
      </div>

<CalendarPicker
        appointments={[]}
        onDateSelect={async (date) => {
          console.log("Selected date:", date);
        }}
      />
    </div>
  );
};

export default UserDashboard;
