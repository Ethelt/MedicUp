import { Box, Typography } from "@mui/material";
import { ValidationError } from "@tanstack/react-form";

export const ErrorText = ({ errors }: { errors: ValidationError[] }) => {
  return (
    <Box mt={1}>
      {errors.length ? (
        <Typography color="error">{errors.join(", ")}</Typography>
      ) : (
        // Invisible placeholder to avoid layout shift
        <Typography visibility="hidden">X</Typography>
      )}
    </Box>
  );
};
