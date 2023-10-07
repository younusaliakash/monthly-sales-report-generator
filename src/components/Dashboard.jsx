import { useState } from "react";
import siteConfig from "../config/siteConfig";
import BarChart from "./Barchart";
import SalesTable from "./SalesTable";
import salesData from "../services/salesData";

const DashBoard = () => {
  const [selectedMonths, setSelectedMonths] = useState(salesData);

  const toggleMonth = (data) => {
    const updatedMonths = [...selectedMonths];
    const findMonth = updatedMonths.find((el) => el === data);
    const index = updatedMonths.indexOf(findMonth);

    if (index !== -1) {
      updatedMonths.splice(index, 1);
    } else {
      updatedMonths.push(data);
    }
    setSelectedMonths(updatedMonths);
  };

  return (
    <div>
      <h1 className="text-center sm:mt-3 md:mt-4">{siteConfig.siteTitle}</h1>
      <h4 className="text-center sm:mt-2 md:mt-3">{siteConfig.tagline}</h4>
      <div className="flex flex-col xl:flex-row items-center justify-center mt-5 grow xl:gap-x-3 ">
        <SalesTable toggleMonth={toggleMonth} selectedMonths={selectedMonths} />
        <BarChart selectedMonths={selectedMonths} />
      </div>
    </div>
  );
};

export default DashBoard;
