import { Typography } from "@mui/material";

function MKTypography({ variant = "h5", color = "primary", children, ...rest }) {
  return (
    <Typography
      variant={variant}
      color={color}
      sx={{
        fontWeight: "bold",
        mb: 2,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
}

export default MKTypography;
