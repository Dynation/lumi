"use client";

import "swiper/css";
import { useState } from "react";
import ServiceSwiper from "./components/ServiceSwiper";
import MasterSwiper from "./components/masterswiper/MasterSwiper";
import MasterAvailabilityChart from "./components/chart/MasterAvailabilityChart";

const MainPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);

  return (
    <main className="w-full max-h-screen p-4 flex flex-col gap-6 items-center bg-[var(--background-color)] text-[var(--text-color)] overflow-x-hidden">
      {/* Блок сервісів */}
      <div className="w-full max-w-[1000px]">
        <ServiceSwiper onServiceSelect={(service) => setSelectedService(service)} />
      </div>

      {/* Свайпер майстрів */}
      <div className="w-full max-w-[1000px]">
        <MasterSwiper
          selectedService={selectedService}
          onDetailsClick={(master) => setSelectedMaster(master.name)}
        />
      </div>

      {/* Діаграма зайнятості */}
      {selectedMaster && (
        <div className="w-full max-w-[1000px] pt-2">
          <MasterAvailabilityChart
            data={[4, 6, 3, 7, 9, 2, 5]}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          />
        </div>
      )}
    </main>
  );
};

export default MainPage;


