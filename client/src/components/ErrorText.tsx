import { Box, Typography } from "@mui/material";
import { ValidationError } from "@tanstack/react-form";

export const ErrorText = ({ errors }: { errors: ValidationError[] }) => {
  return (
    <Box mt={0.5} mb={1}>
      {errors.length && errors.join("").length ? (
        <Typography fontSize={14} color="error">
          {errors.join(", ")}
        </Typography>
      ) : (
        // Invisible placeholder to avoid layout shift
        <Typography visibility="hidden">X</Typography>
      )}
    </Box>
  );
};
