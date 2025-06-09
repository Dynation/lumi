// src/app/components/ClientMainPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ServiceSwiper from "@/app/components/swipers/ServiceSwiper";
import MasterSwiper from "@/app/components/swipers/MasterSwiper";
import MasterAvailabilityChart from "@/app/components/chart/MasterAvailabilityChart";

import type { Filters } from "../ types/filters";

type ClientMainPageProps = {
  filters: Filters;
};

const weeks = [
  { id: "w1", label: "Apr 8", data: [4, 6, 3, 7, 9, 2, 5] },
  { id: "w2", label: "Apr 15", data: [2, 1, 6, 4, 5, 7, 3] },
  { id: "w3", label: "Apr 22", data: [5, 3, 2, 6, 1, 4, 7] },
  { id: "w4", label: "Apr 29", data: [9, 9, 11, 6, 0, 4, 0] },
  { id: "w5", label: "May 6", data: [3, 5, 7, 2, 8, 6, 4] },
  { id: "w6", label: "May 13", data: [6, 4, 3, 7, 5, 2, 8] },
  { id: "w7", label: "May 20", data: [7, 8, 5, 3, 6, 4, 2] },
  { id: "w8", label: "May 27", data: [2, 6, 4, 8, 3, 7, 5] },
  { id: "w9", label: "Jun 3", data: [5, 7, 6, 4, 2, 8, 3] },
  { id: "w10", label: "Jun 10", data: [8, 3, 7, 5, 6, 2, 4] },
];

const ClientMainPage: React.FC<ClientMainPageProps> = ({ }) => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const weekStart = weeks[selectedWeek]?.label || "Unknown Week";

  const handleMasterChange = (newMasterName: string) => {
    if (selectedMaster && newMasterName !== selectedMaster) {
      setShowChart(false);
      setSelectedDate(null);
      setTimeout(() => setSelectedMaster(null), 500);
    }
  };

  const handleDetailsClick = (masterName: string) => {
    setSelectedMaster(masterName);
    setTimeout(() => setShowChart(true), 50);
  };

  return (
    <main className="w-full max-h-screen pt-2 flex flex-col gap-6 items-center text-[var(--text-color)] overflow-x-hidden">
      {/* Свайпер послуг */}
      <div className="w-full max-w-[1000px]">
        <ServiceSwiper
          onServiceSelect={(newService) => {
            if (selectedService && newService !== selectedService) {
              setShowChart(false);
              setSelectedDate(null);
              setTimeout(() => setSelectedService(null), 500);
            }
            setSelectedService(newService);
          }}
        />
      </div>

      {/* Свайпер майстрів */}
      <div className="w-full  max-w-[1000px]">
        <MasterSwiper
          selectedService={selectedService}
          onDetailsClick={(master) => handleDetailsClick(master.name)}
          onMasterSwipe={(master) => handleMasterChange(master.name)}
        />
      </div>

      {/* Чарт з розкладом */}
      {selectedMaster && (
        <>
          <div
            className={`w-full max-w-[1000px] pt-0 pb-6 transition-all duration-500 ease-in-out transform ${
              showChart ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="flex justify-evenly items-center px-10 pb-2">
              <div
                onClick={() => setSelectedWeek((prev) => Math.max(0, prev - 1))}
                className="text-sm text-[var(--text-color)] hover:underline cursor-pointer"
              >
                ◀ Previous
              </div>
              <span key={selectedWeek} className="font-semibold text-[var(--text-color)] ripple-container text-lg animate-ripple opacity-75">{weekStart}</span>
              <div
                onClick={() => setSelectedWeek((prev) => Math.min(prev + 1, weeks.length - 1))}
                className="text-sm text-[var(--text-color)] hover:underline cursor-pointer"
              >
                Next ▶
              </div>
            </div>

            <div className="flex justify-center items-center">
              <MasterAvailabilityChart
                data={weeks[selectedWeek].data}
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                masterName={selectedMaster}
                weekStart={weekStart}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
                onDateSelect={setSelectedDate}
              />
            </div>

            {selectedDate && (
              <div className="absolute z-[999] top-[-35%] inset-x-0 text-center mt-4">
                <div className="bg-[var(--grad-end)] text-[var(--text-color)] p-4 rounded-lg shadow-sm text-sm inline-block">
                  You selected <strong key={selectedDate} className="ripple-container text-lg animate-ripple opacity-75">{selectedDate}</strong>.{" "}
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/calendar?date=${selectedDate}&master=${selectedMaster}`)
                    }
                    className="animate-pulse p-2 hover:text-blue-600 transition ml-2"
                  >
                    Continue to booking →
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default ClientMainPage;
