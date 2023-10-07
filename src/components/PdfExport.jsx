import jsPDF from "jspdf";
import "jspdf-autotable";
import PropTypes from "prop-types";

const PdfExport = ({ selectedMonths, convertIntoImage }) => {
  const saveToPDF = async () => {
    const image = await convertIntoImage();
    const pdf = new jsPDF("p", "", "a4");
    pdf.text("Monthly Sales Statistics Report", 110, 15, {
      align: "center",
    });

    pdf.addImage(image, "PNG", 10, 25, 190, 100);

    pdf.text("Monthly Sales Data Table", 100, 150, {
      align: "center",
    });

    pdf.autoTable({
      startY: 165,
      head: [["Month", "Sales"]],
      body: selectedMonths.map((item) => [item.month, item.sales]),
    });

    pdf.save("Sales Report.pdf");
  };
  return (
    <>
      <button
        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-sky-500 border-sky-500 hover:bg-sky-500 hover:border-sky-500"
        onClick={saveToPDF}
      >
        Export PDF
      </button>
    </>
  );
};

PdfExport.propTypes = {
  selectedMonths: PropTypes.array.isRequired,
  convertIntoImage: PropTypes.func.isRequired,
};

export default PdfExport;
