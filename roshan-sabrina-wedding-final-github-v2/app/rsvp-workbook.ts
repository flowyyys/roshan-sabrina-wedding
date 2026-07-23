import { strToU8, zipSync } from "fflate";

export type RsvpExportRow = {
  name: string;
  guests: number;
  message: string | null;
  created_at: string;
};

type WorkbookInput = {
  accepted: RsvpExportRow[];
  rejected: RsvpExportRow[];
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function inlineStringCell(reference: string, value: string, style = 0) {
  const preserveWhitespace =
    value.startsWith(" ") || value.endsWith(" ")
      ? ' xml:space="preserve"'
      : "";
  return `<c r="${reference}" t="inlineStr" s="${style}"><is><t${preserveWhitespace}>${escapeXml(value)}</t></is></c>`;
}

function numberCell(reference: string, value: number) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `<c r="${reference}"><v>${safeValue}</v></c>`;
}

function worksheetXml(rows: RsvpExportRow[]) {
  const header = [
    inlineStringCell("A1", "Name", 1),
    inlineStringCell("B1", "Number attending", 1),
    inlineStringCell("C1", "Note", 1),
    inlineStringCell("D1", "Submitted at", 1),
  ].join("");

  const body = rows
    .map((row, index) => {
      const rowNumber = index + 2;
      return [
        `<row r="${rowNumber}">`,
        inlineStringCell(`A${rowNumber}`, row.name),
        numberCell(`B${rowNumber}`, row.guests),
        inlineStringCell(`C${rowNumber}`, row.message ?? ""),
        inlineStringCell(`D${rowNumber}`, row.created_at),
        "</row>",
      ].join("");
    })
    .join("");

  const finalRow = Math.max(1, rows.length + 1);

  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>',
    '<cols><col min="1" max="1" width="28" customWidth="1"/><col min="2" max="2" width="18" customWidth="1"/><col min="3" max="3" width="48" customWidth="1"/><col min="4" max="4" width="25" customWidth="1"/></cols>',
    `<sheetData><row r="1">${header}</row>${body}</sheetData>`,
    `<autoFilter ref="A1:D${finalRow}"/>`,
    "</worksheet>",
  ].join("");
}

export function createRsvpWorkbook({ accepted, rejected }: WorkbookInput) {
  const files = {
    "[Content_Types].xml": strToU8(
      [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
        '<Default Extension="xml" ContentType="application/xml"/>',
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>',
        '<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>',
        "</Types>",
      ].join(""),
    ),
    "_rels/.rels": strToU8(
      [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>',
        "</Relationships>",
      ].join(""),
    ),
    "xl/workbook.xml": strToU8(
      [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">',
        '<sheets><sheet name="Accepted" sheetId="1" r:id="rId1"/><sheet name="Rejected" sheetId="2" r:id="rId2"/></sheets>',
        "</workbook>",
      ].join(""),
    ),
    "xl/_rels/workbook.xml.rels": strToU8(
      [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>',
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>',
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>',
        "</Relationships>",
      ].join(""),
    ),
    "xl/styles.xml": strToU8(
      [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
        '<fonts count="2"><font><sz val="11"/><name val="Calibri"/><family val="2"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/><family val="2"/></font></fonts>',
        '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF6E2C3A"/><bgColor indexed="64"/></patternFill></fill></fills>',
        '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>',
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>',
        '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs>',
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>',
        "</styleSheet>",
      ].join(""),
    ),
    "xl/worksheets/sheet1.xml": strToU8(worksheetXml(accepted)),
    "xl/worksheets/sheet2.xml": strToU8(worksheetXml(rejected)),
  };

  return zipSync(files, {
    level: 6,
    mtime: new Date("1980-01-01T00:00:00.000Z"),
  });
}
