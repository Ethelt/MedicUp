import { Patient } from "@medicup/shared";
import InfoIcon from "@mui/icons-material/Info";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

type PatientCardProps = {
  patient: Patient;
  onClick: () => void;
};

export const PatientCard = (props: PatientCardProps) => {
  const { patient } = props;

  return (
    <Card variant="outlined" onClick={props.onClick} sx={{ cursor: "pointer" }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography variant="h6">
              {patient.firstName} {patient.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {patient.pesel ?? patient.passportNumber}
            </Typography>
          </Stack>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};
