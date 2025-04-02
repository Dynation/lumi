"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables, ChartConfiguration } from "chart.js";

Chart.register(...registerables);

interface Props {
  data: number[];
  labels: string[];
  maxThreshold?: number;
}

const MasterAvailabilityChart: React.FC<Props> = ({
  data,
  labels,
  maxThreshold = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const getComputedColor = (cssVar: string): string =>
    getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();

  const drawChart = React.useCallback(
    (textColor: string) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      chartRef.current?.destroy(); // 💥 Знищуємо попередній чарт

      const backgroundColors = data.map((value) => {
        if (value <= maxThreshold * 0.4) return "#60a5fa";
        if (value <= maxThreshold * 0.7) return "#facc15";
        return "#ef4444";
      });

      const config: ChartConfiguration = {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Availability",
              data,
              backgroundColor: backgroundColors,
              borderRadius: 2,
              barThickness: 40,
              order: 2,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            subtitle: {
              display: true,
              text: "Master load chart", 
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
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw as number;
                  let status = "";
                  if (value <= maxThreshold * 0.4) status = "🟦 Low";
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
              offset: false,
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
    [data, labels, maxThreshold]
  );

  useEffect(() => {
    const handleThemeChange = () => {
      const textColor = getComputedColor("--text-color");
      drawChart(textColor);
    };

    // Початкове відображення
    handleThemeChange();

    // 🔄 Кожна зміна теми — слухаємо зміну класу <html>
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [data, labels, maxThreshold, drawChart]);

  return (
    <div className="w-[400px] flex justify-center items-center py-6">
      <div className="w-full max-w-[700px] px-4 rounded-xl bg-[var(--background-color)] text-[var(--text-color)] shadow-lg">
        <canvas ref={canvasRef} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default MasterAvailabilityChart;
