import { saveAs } from "file-saver";
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  WidthType,
  AlignmentType,
  convertInchesToTwip,
  HeadingLevel,
  LevelFormat,
  UnderlineType,
} from "docx";
import "jspdf-autotable";
import PropTypes from "prop-types";

const WordExport = ({ selectedMonths, convertIntoImage }) => {
  const wordDownload = async () => {
    let imageData = await convertIntoImage();
    imageData = imageData.split(",")[1];

    const doc = new Document({
      styles: {
        default: {
          heading1: {
            run: {
              size: 28,
              bold: true,
              italics: true,
              color: "FF0000",
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          heading2: {
            run: {
              size: 26,
              bold: true,
              underline: {
                type: UnderlineType.SINGLE,
                color: "000000",
              },
              alignment: AlignmentType.CENTER,
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120,
              },
            },
          },
          listParagraph: {
            run: {
              color: "#FF0000",
            },
          },
          document: {
            run: {
              size: "11pt",
              font: "Calibri",
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
            },
          },
        },
        paragraphStyles: [
          {
            id: "aside",
            name: "Aside",
            basedOn: "Normal",
            next: "Normal",
            run: {
              color: "999999",
              italics: true,
            },
            paragraph: {
              indent: {
                left: convertInchesToTwip(0.5),
              },
              spacing: {
                line: 276,
              },
            },
          },
          {
            id: "wellSpaced",
            name: "Well Spaced",
            basedOn: "Normal",
            quickFormat: true,
            paragraph: {
              spacing: {
                line: 276,
                before: 20 * 72 * 0.1,
                after: 20 * 72 * 0.05,
              },
            },
          },
          {
            id: "strikeUnderline",
            name: "Strike Underline",
            basedOn: "Normal",
            quickFormat: true,
            run: {
              strike: true,
              underline: {
                type: UnderlineType.SINGLE,
              },
            },
          },
        ],
        characterStyles: [
          {
            id: "strikeUnderlineCharacter",
            name: "Strike Underline",
            basedOn: "Normal",
            quickFormat: true,
            run: {
              strike: true,
              underline: {
                type: UnderlineType.SINGLE,
              },
            },
          },
        ],
      },
      numbering: {
        config: [
          {
            reference: "my-crazy-numbering",
            levels: [
              {
                level: 0,
                format: LevelFormat.LOWER_LETTER,
                text: "%1)",
                alignment: AlignmentType.LEFT,
              },
            ],
          },
        ],
      },
      sections: [
        {
          children: [
            new Paragraph({
              text: "Monthly Sales Report Graph",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: Uint8Array.from(atob(imageData), (c) =>
                    c.charCodeAt(0)
                  ),
                  transformation: {
                    width: 590,
                    height: 360,
                  },
                }),
              ],
            }),
            new Paragraph({
              text: "Monthly Sales Data Table",
              heading: HeadingLevel.HEADING_2,
            }),
            new Table({
              tableHeader: true,
              verticalAlign: VerticalAlign.CENTER,
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 4535,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          text: "Months",
                          bold: true,
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 4535,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          text: "Sales",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
                ...selectedMonths.map(
                  (item) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph(item.month)],
                        }),
                        new TableCell({
                          children: [new Paragraph(item.sales.toString())],
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Sales Report.docx");
    });
  };
  return (
    <>
      <button
        className="flex-no-shrink p-2 border-2 border-teal-400 rounded text-teal-400 hover:text-white hover:bg-teal-400 hover:border-teal-400"
        onClick={wordDownload}
      >
        Export Word
      </button>
    </>
  );
};

WordExport.propTypes = {
  selectedMonths: PropTypes.array.isRequired,
  convertIntoImage: PropTypes.func.isRequired,
};

export default WordExport;
