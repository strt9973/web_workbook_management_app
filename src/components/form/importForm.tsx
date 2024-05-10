import { useState } from "react";

import { Blockquote, Button, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconExclamationCircle } from "@tabler/icons-react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

import { PROBLEM_IMPORT_COLUMN_NAME_MAP } from "../../constants";
import { ImportProblemType } from "../../type";
import { ParseCsvToJson } from "../../utils/parseCsvToJson";
import { importFormValidators } from "./validator";

export const ImportForm = () => {
  const [data, setData] = useState<ImportProblemType[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handlePreviewCSV = async () => {
    try {
      const path = await open({
        multiple: false,
        filters: [{ name: "CSV", extensions: ["csv"] }],
      });
      if (!path) return;

      const value = await readTextFile(path.path);
      const parsed = ParseCsvToJson<ImportProblemType>(
        value,
        PROBLEM_IMPORT_COLUMN_NAME_MAP,
        importFormValidators
      );
      setData(parsed.data);
      setErrors(parsed.errors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImportCSVData = async () => {
    try {
      await invoke<string>("import_problems", {
        data,
      });
      notifications.show({
        title: "Success",
        message: "データの登録が完了しました。",
        color: "blue",
      });
      setData([]);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "データの登録に失敗しました",
        color: "red",
      });
    }
  };

  return (
    <>
      <Button onClick={handlePreviewCSV} mb="lg">
        CSVファイルを選択&プレビュー
      </Button>
      {data && data.length > 0 ? (
        <>
          <Table stickyHeader stickyHeaderOffset={60}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>カテゴリ</Table.Th>
                <Table.Th>問題名</Table.Th>
                <Table.Th>問題URL</Table.Th>
                <Table.Th>ジャンル</Table.Th>
                <Table.Th>難易度</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((value, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{value.category}</Table.Td>
                  <Table.Td>{value.problem_name}</Table.Td>
                  <Table.Td>{value.problem_url}</Table.Td>
                  <Table.Td>{value.genre}</Table.Td>
                  <Table.Td>{value.difficulty_level}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {errors.length > 0 ? (
            <Blockquote
              color="red"
              icon={<IconExclamationCircle />}
              mt="xl"
              p="xs"
              iconSize={30}
            >
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </Blockquote>
          ) : null}
          <Button
            onClick={handleImportCSVData}
            disabled={errors.length ? true : false}
            mt="lg"
          >
            インポート
          </Button>
        </>
      ) : null}
    </>
  );
};
