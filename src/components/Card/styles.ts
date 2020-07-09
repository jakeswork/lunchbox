import { Theme } from "../../utils/theme";

export default  (theme: Theme) => ({
  root: {
    // boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    border: `1px solid ${theme.colorGrey}`,
    background: "#fff",
    borderRadius: 8,
    display: "inline-block",
    position: "relative",
    padding: 32,
    paddingBottom: 24,
    margin: 8,
    zIndex: 0
  }
});
