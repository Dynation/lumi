"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables, ChartConfiguration } from "chart.js";
Chart.register(...registerables);

interface Props {
  data: number[];
  labels: string[];
  maxThreshold?: number;
  masterName?: string;
  weekStart: string;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  onDateSelect?: (date: string) => void;
}

const MasterAvailabilityChart: React.FC<Props> = ({
  data,
  labels,
  maxThreshold = 10,
  masterName,
  onDateSelect,
  weekStart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const selectedIndexRef = useRef<number | null>(null);

  // Removed unused selectedDate state
  const getComputedColor = (cssVar: string): string =>
    getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();

  const drawChart = React.useCallback(
    (textColor: string) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      chartRef.current?.destroy();

      const backgroundColors = data.map((value) => {
        if (value === 0) return "#94a3b8";
        if (value <= maxThreshold * 0.4) return "#60a5fa";
        if (value <= maxThreshold * 0.7) return "#facc15";
        return "#ef4444";
      });

      const updatedLabels = labels.map(
        (label, index) => `${label} (${data[index]})`
      );


      const datasetStyles = {
        borderColor: data.map((_, i) =>
          i === selectedIndexRef.current ? "white" : "transparent"
        ),
        borderWidth: data.map((_, i) =>
          i === selectedIndexRef.current ? 2 : 0
        ),
      };

      const config: ChartConfiguration = {
        type: "bar",
        data: {
          labels: updatedLabels,
          datasets: [
            {
              label: "Availability",
              data,
              backgroundColor: backgroundColors,
              borderRadius: 2,
              barThickness: 40,
              barPercentage: 0.8,
              categoryPercentage: 0.8,
              minBarLength: 4,
              order: 2,
              ...datasetStyles,
            },
          ],
        },
        options: {
          responsive: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          onClick: (event) => {
            if (!onDateSelect || !chartRef.current) return;

            const points = chartRef.current.getElementsAtEventForMode(
              event.native ?? new Event(""),
              "index",
              { intersect: false },
              true
            );

            if (points && points.length > 0) {
              const index = points[0].index;
              const match = weekStart.match(/([A-Za-z]+)\s(\d{1,2})/);
              if (!match) return;
              const [, monthStr, dayStr] = match;
              const baseDate = new Date(
                `${monthStr} ${dayStr}, ${new Date().getFullYear()}`
              );
              if (isNaN(baseDate.getTime())) return;
              const selected = new Date(baseDate);
              selected.setDate(baseDate.getDate() + index);
              const iso = selected.toISOString().split("T")[0];
              selectedIndexRef.current = index;

              const dataset = chartRef.current.data.datasets[0];
              dataset.borderColor = data.map((_, i) =>
                i === index ? "white" : "transparent"
              );
              dataset.borderWidth = data.map((_, i) => (i === index ? 2 : 0));

              chartRef.current.update(); 

              setSelectedDate(iso);
              onDateSelect(iso);
            }
          },
          plugins: {
            subtitle: {
              display: true,
              text: masterName
                ? `Schedule for ${masterName}`
                : "Master schedule",
              color: textColor,
              font: {
                size: 16,
                family: "'Inter', sans-serif",
                weight: "bold",
              },
            },
            legend: {
              labels: {
                color: textColor,
              },
              onClick: undefined,
            },
            tooltip: {
              enabled: typeof window !== "undefined" && window.innerWidth > 768,
              yAlign: "bottom",
              displayColors: false,
              callbacks: {
                label: function (context) {
                  const value = context.raw as number;
                  let status = "";
                  if (value === 0) status = "⬜️ Free";
                  else if (value <= maxThreshold * 0.4) status = "🟦 Low";
                  else if (value <= maxThreshold * 0.7) status = "🟨 Medium";
                  else status = "🟥 High";
                  return `${status}: ${value} appointments`;
                },
              },
            },
          },
          scales: {
            y: {
              min: 0,
              max: maxThreshold,
              ticks: {
                color: textColor,
              },
            },
            x: {
              offset: true,
              ticks: {
                color: textColor,
              },
            },
          },
          animations: {
            enabled: false,
          },
        },
      };

      
      chartRef.current = new Chart(ctx, config);
    },
    [data, labels, maxThreshold, masterName, onDateSelect, weekStart]
  );

  useEffect(() => {
    const handleThemeChange = () => {
      const textColor = getComputedColor("--text-color");
      drawChart(textColor);
    };

    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [data, labels, maxThreshold, drawChart]);

  return (
    <div className="w-[400px] flex flex-col justify-center items-center py-6">
      <div className="w-full max-w-[700px]  px-4 rounded-xl bg-[var(--background-color)] text-[var(--text-color)] shadow-lg">
        <canvas ref={canvasRef} className="w-full cursor-pointer" />
      </div>
    </div>
  );
};

export default MasterAvailabilityChart;
function setSelectedDate(iso: string) {
  console.log(`Selected date set to: ${iso}`);
}

