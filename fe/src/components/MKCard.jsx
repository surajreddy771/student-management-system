import { Card, CardContent } from "@mui/material";

function MKCard({ children, ...rest }) {
  return (
    <Card
      sx={{
        padding: "2rem",
        borderRadius: "20px",
        boxShadow: 3,
      }}
      {...rest}
    >
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default MKCard;
