import { createTheme } from "@mui/material";
export const C = { navy: "#0A1F44", deep: "#06142E", mid: "#12306B", sky: "#4FC3F7", ice: "#E1F5FE" };
const f = "'Nunito', sans-serif";
export default createTheme({
  palette: { mode: "dark", primary: { main: C.sky }, background: { default: C.navy, paper: C.mid }, text: { primary: "#fff", secondary: "#B7D3EE" } },
  shape: { borderRadius: 16 },
  typography: { fontFamily: f, h1: { fontWeight: 900 }, h2: { fontWeight: 800 }, h3: { fontWeight: 800 }, button: { fontWeight: 800, textTransform: "none" } },
  components: { MuiCssBaseline: { styleOverrides: { body: { fontFamily: f } } } },
});
