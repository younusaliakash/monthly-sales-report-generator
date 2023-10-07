import salesData from "../services/salesData";
import PropTypes from "prop-types";

const SalesTable = ({ toggleMonth, selectedMonths }) => {
  const totalSales = salesData?.reduce((total, item) => item.sales + total, 0);
  return (
    <div className="relative overflow-x-auto box-shadow p-2 rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-2 rounded-l-lg">
              No
            </th>
            <th scope="col" className="px-6 py-2 rounded-l-lg">
              Status
            </th>
            <th scope="col" className="px-6 py-2 rounded-l-lg">
              Months
            </th>
            <th scope="col" className="px-6 py-2 rounded-r-lg">
              Sales
            </th>
          </tr>
        </thead>
        <tbody>
          {salesData?.map((element, index) => (
            <tr
              className="bg-white dark:bg-gray-800"
              onClick={() => toggleMonth(element)}
              key={index}
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={selectedMonths.includes(element)}
                />
              </th>
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {element.month}
              </th>
              <td className="px-6 py-2">${element.sales}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-2 text-base">
              {" "}
            </th>
            <th scope="row" className="px-6 py-2 text-base">
              {" "}
            </th>
            <th scope="row" className="px-6 py-2 text-base">
              Total
            </th>
            <td className="px-6 py-2">${totalSales}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

SalesTable.propTypes = {
  selectedMonths: PropTypes.array,
  toggleMonth: PropTypes.func.isRequired,
};

export default SalesTable;
