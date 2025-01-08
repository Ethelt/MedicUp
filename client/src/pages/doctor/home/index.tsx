import {
  ApiRoutes,
  CancelVisitRequestDto,
  CancelVisitResponseDto,
  GetVisitsForDoctorRequestDto,
  GetVisitsForDoctorResponseDto,
  Visit,
} from "@medicup/shared";
import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Api } from "../../../api";
import StaticVisitsCalendar from "../../../components/visits/StaticVisitsCalendar";
import { VisitInfoDialogProps } from "../../../components/visits/VisitInfoDialog";
import { DoctorContext } from "../../../context/DoctorContext";
import DoctorVisitDialog from "./DoctorVisitDialog";

export default function DoctorHome() {
  const { doctor } = useContext(DoctorContext);
  const [visits, setVisits] = useState<Visit[]>([]);

  const refreshVisits = useCallback(async () => {
    if (!doctor) return;

    const result = await Api.get<
      GetVisitsForDoctorRequestDto,
      GetVisitsForDoctorResponseDto
    >(ApiRoutes.doctor.visits, {
      doctorId: doctor.id,
    });

    if (result.ok) {
      setVisits(result.data.visits);
    } else {
      // @TODO: handle errors
    }
  }, [doctor]);

  useEffect(() => {
    refreshVisits();
  }, [refreshVisits]);

  const cancelVisit = useCallback(
    async (visit: Visit) => {
      const result = await Api.delete<
        CancelVisitRequestDto,
        CancelVisitResponseDto
      >(ApiRoutes.visit.root, {
        visitId: visit.id,
      });

      if (result.ok) {
        refreshVisits();
      }
    },
    [refreshVisits]
  );

  const [visitInfoPopupConfig, setVisitInfoPopupConfig] = useState<
    Omit<VisitInfoDialogProps, "onCancel">
  >({
    open: false,
    onClose: () =>
      setVisitInfoPopupConfig((config) => ({ ...config, open: false })),
    visit: null,
  });

  const handleEventClick = useCallback((visit: Visit) => {
    setVisitInfoPopupConfig((config) => ({
      ...config,
      open: true,
      visit,
    }));
  }, []);

  return (
    <Stack height="100%">
      <Typography variant="h2">DoctorHome</Typography>
      <Box sx={{ width: "100%" }} flex={1} minHeight={0}>
        <StaticVisitsCalendar
          handleEventClick={handleEventClick}
          visits={visits}
        />
        <DoctorVisitDialog {...visitInfoPopupConfig} onCancel={cancelVisit} />
      </Box>
    </Stack>
  );
}
