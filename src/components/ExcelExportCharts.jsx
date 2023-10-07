import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Workbook } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { WorksheetRegion } from "igniteui-react-excel";
import { ChartType } from "igniteui-react-excel";
import { AxisType } from "igniteui-react-excel";
import { IgrDataGrid } from "igniteui-react-grids";
import { IgrTextColumn } from "igniteui-react-grids";
import { IgrNumericColumn } from "igniteui-react-grids";
import { IgrCategoryChart } from "igniteui-react-charts";
import { IgrDataGridModule } from "igniteui-react-grids";
import { IgrCategoryChartModule } from "igniteui-react-charts";
import { IgrExcelXlsxModule } from "igniteui-react-excel";
import { IgrExcelCoreModule } from "igniteui-react-excel";
import { IgrExcelModule } from "igniteui-react-excel";
import { ExcelUtility } from "../utils/ExcelUtility";

IgrDataGridModule.register();
IgrCategoryChartModule.register();
IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();

const ExcelExportCharts = ({ selectedMonths }) => {
  const [excelData, setExcelData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const initData = () => {
    const months = selectedMonths.map((el) => el.month);
    const groups = ["Sales"];
    const expanseKey = "Expense";
    const monthKey = "Month";
    const data = [];
    for (const group of groups) {
      const r = {};
      r[expanseKey] = group;
      for (const month of months) {
        const x = (1 * 15 * Math.PI) / 180;
        const salesObject = selectedMonths.find(
          (object) => object.month === month
        );
        const heat = Math.floor(Math.cos(x)) + salesObject.sales;
        if (group === "Sales") {
          r[month] = Math.round(heat);
        }
      }
      data.push(r);
    }
    setExcelData(data);

    let chartData = [];
    for (const month of months) {
      const r = {};
      r[monthKey] = month;
      for (const item of data) {
        r[item[expanseKey]] = item[month];
      }
      chartData.push(r);
    }
    setChartData(chartData);
  };

  const exportData = () => {
    const headers = Object.keys(excelData[0]);
    headers.pop();

    const wb = new Workbook(WorkbookFormat.Excel2007);
    const ws = wb.worksheets().add("Sheet1");
    ws.defaultColumnWidth = 200 * 20;

    const firstDataRow = 2;
    const headerRow = ws.rows(firstDataRow - 1);
    for (let c = 0; c < headers.length; c++) {
      headerRow.setCellValue(c, headers[c]);
    }

    for (let r = 0; r < excelData.length; r++) {
      const xlRow = ws.rows(r + firstDataRow);
      const dataRow = excelData[r];
      for (let c = 0; c < headers.length; c++) {
        xlRow.setCellValue(c, dataRow[headers[c]]);
      }
    }

    const indexRow = firstDataRow - 1;
    const indexData = firstDataRow + excelData.length - 1;
    const indexHeader = headers.length - 1;

    const tableRegion = new WorksheetRegion(
      ws,
      indexRow,
      0,
      indexData,
      indexHeader
    );
    const table = ws.tables().add(tableRegion.toString(), true);

    ws.rows(0).height = 5000;
    const chart = ws
      .shapes()
      .addChart(
        ChartType.ColumnClustered,
        ws.rows(0).cells(0),
        { x: 0, y: 0 },
        ws.rows(0).cells(headers.length - 1),
        { x: 100, y: 100 }
      );
    chart.setSourceData(table.wholeTableRegion.toString(), true);

    chart.axisCollection(AxisType.Category).axisBetweenCategories = true;

    ExcelUtility.save(wb, "Sales Report");
  };

  useEffect(() => {
    initData();
  }, [selectedMonths]);

  return (
    <div className="">
      <button
        className="options-button flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500 hover:border-green-500"
        onClick={exportData}
      >
        Export Excel
      </button>
      <div className="container opacity-0 absolute">
        <IgrCategoryChart
          height="50%"
          width="100%"
          yAxisMinimumValue={0}
          xAxisInterval={1}
          chartType="column"
          brushes="#4f81bd, #c0504d, #9bbb59, #8064a2"
          outlines="#4f81bd, #c0504d, #9bbb59, #8064a2"
          thickness={0}
          dataSource={chartData}
        />
        <IgrDataGrid
          height="50%"
          width="100%"
          autoGenerateColumns="false"
          dataSource={excelData}
        >
          <IgrTextColumn field="Expense" width="*>100" />
          <IgrNumericColumn field="Jan" width="*>75" />
        </IgrDataGrid>
      </div>
    </div>
  );
};

ExcelExportCharts.propTypes = {
  selectedMonths: PropTypes.array.isRequired,
};

export default ExcelExportCharts;
