type CSVColumnMap<T> = {
  [key: string]: keyof T;
};

export const ParseCsvToJson = <T>(
  csv: string,
  column_name_map: CSVColumnMap<T>,
  validationRules: {
    [K in keyof T]?: (value: string) => boolean | string;
  }
): { data: T[]; errors: string[] } => {
  let errors: string[] = [];
  const normalizedCsv = csv.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const rows = normalizedCsv.split("\n");
  const headers = rows[0].split(",").map((header) => header.trim());

  // ヘッダーチェック
  const missingHeaders = Object.keys(column_name_map).filter(
    (header) => !headers.includes(header)
  );
  if (missingHeaders.length > 0) {
    errors.push(
      `ヘッダーが確認できませんでした。不足しているヘッダー: ${missingHeaders.join(
        ", "
      )}`
    );
    return { data: [], errors: errors };
  }

  const data = rows
    .slice(1)
    .map((row, rowIndex) => {
      if (row === "") return undefined;
      const values = row.split(",").map((value) => value.trim());
      console.log(values);
      const obj = {} as T;
      headers.forEach((header, index) => {
        const key = column_name_map[header];
        if (key) {
          const value = values[index];
          // 存在チェック
          if (value === "" || value === undefined) {
            errors.push(`${rowIndex + 1}行目: ${header}'の値がありません。`);
          }
          // 追加validation
          const validator = validationRules[key];
          if (validator) {
            const validationResult = validator(value);
            if (typeof validationResult === "string") {
              errors.push(
                `${rowIndex + 1}行目: ${header}の値は${validationResult}`
              );
            } else if (!validationResult) {
              errors.push(`${rowIndex + 1}行目: ${header}の値が無効です。`);
            }
          }
          obj[key] = value as any;
        }
      });
      return obj;
    })
    .filter(Boolean) as T[];

  return { data: data, errors: errors };
};
