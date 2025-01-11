import {
  ApiRoutes,
  UpdatePatientRequestDto,
  UpdatePatientResponseDto,
} from "@medicup/shared";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Api } from "../../../api";
import { ErrorText } from "../../../components/ErrorText";
import { AppRoutes } from "../../../constants/AppRoutes";
import { PatientContext } from "../../../context/PatientContext";

// @Task: wyświetlanie i edycja profilu pacjenta; na razie tylko wygląd
// nie musisz zmieniać nic poza tym plikiem

// to są dane w formularzu
type PatientProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pesel: string;
};

export default function PatientProfile() {
  // tutaj jest trzymany pacjent po tym jak się zalogował
  const { patient, refresh } = useContext(PatientContext);
  const navigate = useNavigate();
  // tutaj jest formularz
  const form = useForm<PatientProfileForm>({
    // tutaj są dane domyślne
    defaultValues: {
      firstName: patient?.firstName || "",
      lastName: patient?.lastName || "",
      email: patient?.email || "",
      phoneNumber: patient?.phone || "",
      pesel: patient?.pesel || "",
    },
    // tutaj jest funkcja która się wywołuje po zapisaniu formularza
    // nic tu na razie nie zmieniaj
    onSubmit: async (values) => {
      if (!patient) return;

      const dto: UpdatePatientRequestDto = {
        patientId: patient.id,
        firstName: values.value.firstName,
        lastName: values.value.lastName,
        email: values.value.email,
        phone: values.value.phoneNumber,
        pesel: values.value.pesel,
      };

      const result = await Api.patch<
        UpdatePatientRequestDto,
        UpdatePatientResponseDto
      >(ApiRoutes.patient.root, dto);

      if (result.ok) {
        refresh();
        navigate(AppRoutes.patient.home);
      } else {
        console.error("Failed to update patient:", result.error);
      }
    },
  });

  // jeśli pacjent nie jest załadowany to wyświetla się loading
  if (!patient) {
    return <div>Ładowanie...</div>;
  }

  // tutaj jest formularz
  return (
    <Stack spacing={2} maxWidth="600px" margin="auto" padding={2}>
      {/* kazde takie form.Field to jest pole w formularzu */}
      <form.Field
        name="firstName"
        // to mówi jak sprawdza się to pole po kazdej zmianie
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Imię jest wymagane";
            }
          },
        }}
        children={(field) => (
          <>
            {/* to jest faktyczne pole w formularzu z biblioteki MUI */}
            <TextField
              fullWidth
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Imię"
            />
            {/* to jest komponent który wyświetla błędy, zignoruj */}
            <ErrorText errors={field.state.meta.errors} />
          </>
        )}
      />

      <form.Field
        name="lastName"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Nazwisko jest wymagane";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
              fullWidth
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Nazwisko"
            />
            <ErrorText errors={field.state.meta.errors} />
          </>
        )}
      />

      <form.Field
        name="email"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Email jest wymagany";
            }
            // to się nazywa regex, mozecie zignorowac
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.value)) {
              return "Nieprawidłowy adres email";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
              fullWidth
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Email"
            />
            <ErrorText errors={field.state.meta.errors} />
          </>
        )}
      />

      <form.Field
        name="phoneNumber"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Numer telefonu jest wymagany";
            }
            if (!/^\d{9}$/.test(value.value)) {
              return "Nieprawidłowy numer telefonu (9 cyfr)";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
              fullWidth
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Numer telefonu"
            />
            <ErrorText errors={field.state.meta.errors} />
          </>
        )}
      />

      <form.Field
        name="pesel"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "PESEL jest wymagany";
            }
            if (!/^\d{11}$/.test(value.value)) {
              return "Nieprawidłowy PESEL (11 cyfr)";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
              fullWidth
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="PESEL"
            />
            <ErrorText errors={field.state.meta.errors} />
          </>
        )}
      />

      {/* to jest komponent który wyświetla loading button, mozesz zignorowac */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <LoadingButton
            onClick={form.handleSubmit}
            variant="contained"
            disabled={!canSubmit}
            loading={isSubmitting}
            fullWidth
          >
            Zapisz zmiany
          </LoadingButton>
        )}
      />
    </Stack>
  );
}