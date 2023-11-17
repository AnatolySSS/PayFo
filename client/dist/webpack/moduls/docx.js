//Формирование Word файла
import { Document, Packer, Paragraph, AlignmentType, LineRuleType, TextRun, Table, TableRow, 
         TableCell, BorderStyle, VerticalAlign, HeightRule, ImageRun, PageNumber, Header, WidthType,
         convertInchesToTwip } from 'docx'
import { saveAs } from 'file-saver';
import { Buffer } from 'buffer'
import { fu_data } from './objects/fuData';

//Картинка с логотипом СОДФУ
const imageBase64Data = `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`

let image_fu = new ImageRun({
  data: Buffer.from(imageBase64Data, "base64"),
  transformation: {
    width: 94,
    height: 77,
  },
})

export function makeDecisionFile(decision_number, all_paragraphs) {

  let paragraphs = []
  for (let i = 0; i < 1000; i++) {
    paragraphs[i] = ""
  }
  let paragraphs_special = []

  for (let i = 0; i <= all_paragraphs.length; i++) {
    paragraphs[i] = new Paragraph({ 
      style: "myCustomStyle", 
      children: [
        new TextRun({
          text: all_paragraphs[i],
          bold: all_paragraphs[i] == "УСТАНОВИЛ:" || 
                all_paragraphs[i] == "РЕШИЛ:" ||
                all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? true : false,
          characterSpacing: all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                            all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                            all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? 20 : 0,
        }),
      ],
      indent: {
        firstLine: all_paragraphs[i] == "УСТАНОВИЛ:" || 
                   all_paragraphs[i] == "РЕШИЛ:" ||
                   all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                   all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                   all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? 0 : 711,
      },
      alignment: all_paragraphs[i] == "УСТАНОВИЛ:" || 
                 all_paragraphs[i] == "РЕШИЛ:" ||
                 all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                 all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
                 all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
      spacing: {
        line: 360,
        lineRule: LineRuleType.AUTO,
        after: all_paragraphs[i] == "УСТАНОВИЛ:" || 
               all_paragraphs[i] == "РЕШИЛ:" ||
               all_paragraphs[i] == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
               all_paragraphs[i] == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ" || 
               all_paragraphs[i] == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ" ? 180 : 0,
        before: all_paragraphs[i] == "УСТАНОВИЛ:" ||
                all_paragraphs[i] == "РЕШИЛ:" ? 180 : 0,
      },
    })
  }

  paragraphs_special[0] = new Paragraph({ 
    style: "myCustomStyle", 
    children: [
      new TextRun({
        text: "СЛУЖБА ФИНАНСОВОГО УПОЛНОМОЧЕННОГО",
        bold: true,
        size: 28,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: {
      after: 180,
    },
  })

  paragraphs_special[1] = new Paragraph({ 
    style: "myCustomStyle", 
    children: [
      new TextRun({
        text: "РЕШЕНИЕ",
        bold: true,
        size: 32,
        characterSpacing: 95,
      }),
    ],
    alignment: AlignmentType.CENTER,
  })

  // paragraphs_special[2] = new Paragraph({ 
  //   style: "myCustomStyle", 
  //   children: [
  //     new TextRun({
  //       text: paragraphs[0],
  //       bold: true,
  //       size: 28,
  //       characterSpacing: 20,
  //     }),
  //   ],
  //   alignment: AlignmentType.CENTER,
  //   spacing: {
  //     line: 360,
  //     lineRule: LineRuleType.AUTO,
  //     after: 180,
  //   },
  // })

  paragraphs_special[3] = new Paragraph({
    style: "myCustomStyle", 
    children: [
      image_fu,
    ],
    spacing: {
      line: 360,
      lineRule: LineRuleType.AUTO,
    },
    alignment: AlignmentType.CENTER,
  })

  paragraphs_special[4] = new Paragraph({
    style: "myCustomStyle", 
    children: [
      new TextRun({
        text: "Podpisant",
        size: 24,
        color: "FFFFFF",
      })
    ],
    alignment: AlignmentType.RIGHT,
  })

  let fu_name = ""
  let fu_post = ""
  fu_data.fu_data.forEach(element => {
    if (document.getElementById('fu_name').value == element.fu_name_select) {
      fu_name = element.fu_name
      fu_post = element.fu_post
    }
  })

  paragraphs_special[5] = new Paragraph({
    style: "myCustomStyle", 
    children: [
      new TextRun({
        text: fu_name,
        size: 28,
      })
    ],
    alignment: AlignmentType.RIGHT,
  })

  paragraphs_special[6] = new Paragraph({
    style: "myCustomStyle", 
    children: [
      new TextRun({
        text: "Финансовый уполномоченный",
        size: 28,
      })
    ],
    alignment: AlignmentType.LEFT,
  })

  const borders = {
    top: {
        style: BorderStyle.NIL,
        size: 0,
    },
    bottom: {
        style: BorderStyle.NIL,
        size: 0,
    },
    left: {
        style: BorderStyle.NIL,
        size: 0,
    },
    right: {
        style: BorderStyle.NIL,
        size: 0,
    },
};

  const doc = new Document({
  sections: [
    { 
      properties: {
        page: {
          pageNumbers: {
            start: 1,
          },
          margin: {
            top: convertInchesToTwip(0.8),
            right: convertInchesToTwip(0.6),
            bottom: convertInchesToTwip(0.8),
            left: convertInchesToTwip(1.2),
          },
        },
        titlePage: true,
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              style: "myCustomStyle", 
              children: [
                new TextRun({
                    children: [PageNumber.CURRENT],
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      children: [
        new Table({
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({ 
              children: [
                new TableCell({
                  width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    paragraphs_special[3],
                    paragraphs_special[0],
                    paragraphs_special[1],
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "",
                          size: 20,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "",
                          size: 20,
                        }),
                      ],
                    }),
                  ],
                  columnSpan: 2,
                  borders,
                }),
              ],
            }),
            new TableRow({ 
              width: {
                size: 50,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "",
                          size: 24,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "",
                          size: 24,
                        }),
                      ],
                    }),
                  ],
                  borders,
                }),
                new TableCell({
                  width: {
                    size: 50,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [],
                  borders,
                }),
              ],
            }),
            new TableRow({ 
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "  дата подписания",
                          size: 20,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "",
                          size: 24,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "№ ",
                          size: 24,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "г. Москва",
                          size: 24,
                        }),
                      ],
                    }),
                  ],
                  borders,
                }),
                new TableCell({
                  children: [],
                  borders,
                }),
              ],
            }),
          ],
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          columnWidths: [convertInchesToTwip(8), convertInchesToTwip(8)],
        }),
        new Paragraph({
          style: "myCustomStyle", 
          children: [
            new TextRun({
              text: "",
              size: 28,
            }),
          ],
          spacing: {
            before: 180,
            after: 180,
          },
        }),
        // paragraphs_special[2],
        ...paragraphs,
        // paragraphs[0],
        // paragraphs[1],
        // paragraphs[2],
        // paragraphs[3],
        // paragraphs[4],
        // paragraphs[5],
        // paragraphs[6],
        // paragraphs[7],
        // paragraphs[8],
        // paragraphs[9],
        // paragraphs[10],
        // paragraphs[11],
        // paragraphs[12],
        // paragraphs[13],
        // paragraphs[14],
        // paragraphs[15],
        // paragraphs[16],
        // paragraphs[17],
        // paragraphs[18],
        // paragraphs[19],
        // paragraphs[20],
        // paragraphs[21],
        // paragraphs[22],
        // paragraphs[23],
        // paragraphs[24],
        // paragraphs[25],
        // paragraphs[26],
        // paragraphs[27],
        // paragraphs[28],
        // paragraphs[29],
        // paragraphs[30],
        // paragraphs[31],
        // paragraphs[32],
        // paragraphs[33],
        // paragraphs[34],
        // paragraphs[35],
        // paragraphs[36],
        // paragraphs[37],
        // paragraphs[38],
        // paragraphs[39],
        // paragraphs[40],
        // paragraphs[41],
        // paragraphs[42],
        // paragraphs[43],
        // paragraphs[44],
        // paragraphs[45],
        // paragraphs[46],
        // paragraphs[47],
        // paragraphs[48],
        // paragraphs[49],
        // paragraphs[50],
        // paragraphs[51],
        // paragraphs[52],
        // paragraphs[53],
        // paragraphs[54],
        // paragraphs[55],
        // paragraphs[56],
        // paragraphs[57],
        // paragraphs[58],
        // paragraphs[59],
        // paragraphs[60],
        // paragraphs[61],
        // paragraphs[62],
        // paragraphs[63],
        // paragraphs[64],
        // paragraphs[65],
        // paragraphs[66],
        // paragraphs[67],
        // paragraphs[68],
        // paragraphs[69],
        // paragraphs[70],
        // paragraphs[71],
        // paragraphs[72],
        // paragraphs[73],
        // paragraphs[74],
        // paragraphs[75],
        // paragraphs[76],
        // paragraphs[77],
        // paragraphs[78],
        // paragraphs[79],
        // paragraphs[80],
        // paragraphs[81],
        // paragraphs[82],
        // paragraphs[83],
        // paragraphs[84],
        // paragraphs[85],
        // paragraphs[86],
        // paragraphs[87],
        // paragraphs[88],
        // paragraphs[89],
        // paragraphs[90],
        // paragraphs[91],
        // paragraphs[92],
        // paragraphs[93],
        // paragraphs[94],
        // paragraphs[95],
        // paragraphs[96],
        // paragraphs[97],
        // paragraphs[98],
        // paragraphs[99],
        // paragraphs[100],
        // paragraphs[101],
        // paragraphs[102],
        // paragraphs[103],
        // paragraphs[104],
        // paragraphs[105],
        // paragraphs[106],
        // paragraphs[107],
        // paragraphs[108],
        // paragraphs[109],
        // paragraphs[110],
        // paragraphs[111],
        // paragraphs[112],
        // paragraphs[113],
        // paragraphs[114],
        // paragraphs[115],
        // paragraphs[116],
        // paragraphs[117],
        // paragraphs[118],
        // paragraphs[119],
        // paragraphs[120],
        // paragraphs[121],
        new Paragraph({ 
          style: "myCustomStyle", 
          children: [
            new TextRun({
              text: "",
              size: 28,
            }),
          ],
          spacing: {
            line: 360,
            lineRule: LineRuleType.AUTO,
          },
        }),
        new Paragraph({ 
          style: "myCustomStyle", 
          children: [
            new TextRun({
              text: "",
              size: 28,
            }),
          ],
          spacing: {
            line: 360,
            lineRule: LineRuleType.AUTO,
          },
        }),
        new Paragraph({ 
          style: "myCustomStyle", 
          children: [
            new TextRun({
              text: "",
              size: 28,
            }),
          ],
          spacing: {
            line: 360,
            lineRule: LineRuleType.AUTO,
          },
        }),
        new Table({
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({ 
              children: [
                new TableCell({
                  width: {
                    size: 33,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    paragraphs_special[6]
                  ],
                  borders,
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
                new TableCell({
                  width: {
                    size: 33,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [],
                  borders,
                }),
                new TableCell({
                  width: {
                    size: 33,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    paragraphs_special[4],
                    paragraphs_special[5],
                  ],
                  borders,
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
              ],
              style: {
                height: {
                  rule: HeightRule.AUTO,
                  value: 1700, 
                },
              }
            }),
          ],
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          columnWidths: [convertInchesToTwip(5), convertInchesToTwip(5), convertInchesToTwip(5)],
        }),
      ],
    },
  ],
  styles: 
    {
      paragraphStyles: [
        {
          id: "myCustomStyle",
          name: "My Custom Style",
          basedOn: "Normal",
          run: {
            size: 28,
            font: "Times New Roman",
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED
          },
        }
      ]
    },
  });

  Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Решение ${decision_number} вер.1.docx`);
  });
}