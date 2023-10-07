import * as XLSX from "xlsx";
import PropTypes from "prop-types";

const ExcelExport = ({ selectedMonths }) => {
  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(selectedMonths);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

    const chartWorksheet = XLSX.utils.aoa_to_sheet([
      ["Month", "Sales"],
      ...selectedMonths.map((item) => [item.month, item.sales]),
    ]);
    XLSX.utils.book_append_sheet(workbook, chartWorksheet, "Bar Chart");

    // Add the chart to the worksheet
    //  XLSX.utils.sheet_add_chart(chartWorksheet, chart, "A1");

    XLSX.writeFile(workbook, "Sales Report.xlsx");
  };
  return (
    <>
      <button onClick={downloadExcel}>Export Excel</button>
    </>
  );
};

ExcelExport.propTypes = {
  selectedMonths: PropTypes.array.isRequired,
  convertIntoImage: PropTypes.func,
};

export default ExcelExport;
