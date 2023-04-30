import { Chip } from "@mui/material";

const ColorIndicator = ({ color, ...props }) => {
  return (
    <Chip
      {...props}
      sx={{
        width: "8px",
        height: "8px",
        marginY: "auto",
        marginRight: "12px",
        backgroundColor: color,
        ...props.sx,
      }}
    />
  );
};

export default ColorIndicator;
