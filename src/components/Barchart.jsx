import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { registerables } from "chart.js";
import { useRef } from "react";
import "jspdf-autotable";
import PropTypes from "prop-types";
import WordExport from "./WordExport";
import PdfExport from "./PdfExport";
import ExcelExportCharts from "./ExcelExportCharts";

Chart.register(...registerables);

const BarChart = ({ selectedMonths }) => {
  let barRef = useRef(null);

  const convertIntoImage = () => {
    const newImage = barRef.current?.toBase64Image();

    return newImage;
  };

  const chart = {
    type: "bar",
    data: {
      labels: selectedMonths.map((item) => item.month),
      datasets: [
        {
          label: "Sales",
          data: selectedMonths.map((item) => item.sales),
          backgroundColor: "rgb(8, 143, 143)",
          borderColor: "rgb(9, 121, 105)",
        },
      ],
    },
    options: {
      title: "Sales Report",
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  return (
    <div className="min-w-[400px] overflow-x-auto md:min-w-[800px] box-shadow p-3 rounded-xl">
      <div className="cta flex justify-end gap-1 pb-5">
        <WordExport
          selectedMonths={selectedMonths}
          convertIntoImage={convertIntoImage}
        />
        <PdfExport
          selectedMonths={selectedMonths}
          convertIntoImage={convertIntoImage}
        />
        <ExcelExportCharts selectedMonths={selectedMonths} />
      </div>
      <Bar data={chart.data} options={chart} ref={barRef} />
    </div>
  );
};

BarChart.propTypes = {
  selectedMonths: PropTypes.array.isRequired,
};

export default BarChart;
