type CSVColumnMap<T> = {
  [key: string]: keyof T;
};

export const ParseCsvToJson = <T>(
  csv: string,
  column_name_map: CSVColumnMap<T>
): T[] => {
  const normalizedCsv = csv.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const rows = normalizedCsv.split("\n");
  const headers = rows[0].split(",").map((header) => header.trim());

  const data = rows.slice(1).map((row) => {
    const values = row.split(",").map((value) => value.trim());
    const obj = {} as T;
    headers.forEach((header, index) => {
      const key = column_name_map[header];
      if (key) obj[key] = values[index] as any;
    });
    return obj;
  });

  return data;
};
