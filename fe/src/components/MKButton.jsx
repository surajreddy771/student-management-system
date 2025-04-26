import { Button } from "@mui/material";

function MKButton({ color = "primary", size = "medium", children, ...rest }) {
  return (
    <Button
      variant="contained"
      color={color}
      size={size}
      sx={{
        borderRadius: "12px",
        fontWeight: "bold",
        textTransform: "none",
        padding: "0.75rem 1.5rem",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default MKButton;
