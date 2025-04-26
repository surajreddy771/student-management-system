// components/StatsCard.jsx
import MKCard from "./MKCard.jsx";
import MKTypography from "./MKTypography.jsx";

function StatsCard({ title, value }) {
  return (
    <MKCard sx={{ textAlign: "center", padding: 3 }}>
      <MKTypography variant="h6" color="textSecondary" mb={1}>
        {title}
      </MKTypography>
      <MKTypography variant="h4" color="primary">
        {value}
      </MKTypography>
    </MKCard>
  );
}

export default StatsCard;
