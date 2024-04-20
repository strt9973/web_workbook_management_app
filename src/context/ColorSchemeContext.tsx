import { createContext, Dispatch, SetStateAction } from "react";

export type ColorSchemeType = "light" | "dark"; // 色スキームの型を限定

interface ColorSchemeContextType {
  colorScheme: ColorSchemeType;
  onChange: Dispatch<SetStateAction<ColorSchemeType>>;
}

// 初期値を設定
const defaultValue: ColorSchemeContextType = {
  colorScheme: "light",
  onChange: () => {},
};

const ColorSchemeContext = createContext<ColorSchemeContextType>(defaultValue);

export default ColorSchemeContext;
