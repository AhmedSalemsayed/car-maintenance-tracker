"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { car, MaintenanceItem } from "@/lib/zodSchemas";
import { useIsMobile } from "@/hooks/use-mobile";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
//MaintenanceData?.map((ele) => ele.map((item) => item.name)).flat()
const BarChart = ({ MaintenanceData }: { MaintenanceData: car[] }) => {
  const isMobile = useIsMobile();
  if (!MaintenanceData || MaintenanceData.length === 0) return null;
  const colorPalette = [
    "rgba(153, 102, 255, 0.9)", // purple
    "rgba(75, 192, 192, 0.9)", // teal
    "rgba(238, 211, 9, 0.9)", // yellow
    "rgba(233, 118, 4, 0.9)", // orange
    "rgba(246, 19, 68, 0.9)", // red
    "rgba(54, 162, 235, 0.6)", // blue
  ];
  const data = {
    labels: MaintenanceData?.at(-1).Maintenance.map(
      (item: MaintenanceItem) => item.name
    ),
    datasets: MaintenanceData?.map((car: car, i) => {
      return {
        label: car.brand + " " + car.model,
        data: car.Maintenance.map((item: MaintenanceItem) => {
          if (item.historyLog.length === 0) return 0;
          if (
            item.historyLog.at(-1)?.kilometrageNextMaintenance -
              item.currentKilometrage <=
            0
          )
            return 0;
          return Math.round(
            ((item.historyLog.at(-1)?.kilometrageNextMaintenance -
              item.currentKilometrage) /
              Number(item.changeEvery)) *
              100
          );
        }),
        backgroundColor: colorPalette[i],
        borderRadius: 2,
      };
    }),
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Condition (%)",
          color: "#807e7e",
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: (value) => value + " %",
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 7 : 12,
            family: "Roboto",
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Car Parts Condition",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
