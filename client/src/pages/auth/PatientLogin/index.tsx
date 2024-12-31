import {
  ApiRoutes,
  PatientLoginRequestDto,
  PatientLoginResponseDto,
} from "@medicup/shared";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router";
import { Api } from "../../../api";
import { ErrorText } from "../../../components/ErrorText";
import { AppRoutes } from "../../../constants/AppRoutes";

type PatientLoginForm = {
  email: string;
  password: string;
};

export default function PatientLogin() {
  const navigate = useNavigate();

  const form = useForm<PatientLoginForm>({
    defaultValues: {
      email: "bartek@test.com",
      password: "Test1234!",
    },
    onSubmit: async (values) => {
      const response = await Api.post<
        PatientLoginRequestDto,
        PatientLoginResponseDto
      >(ApiRoutes.auth.loginPatient, values.value);

      if (response.ok) {
        navigate(AppRoutes.patient.home);
      } else {
        console.log("Error", response.error);
        // @TODO: error handling
      }
    },
  });

  return (
    <Stack border="1px solid black" p={2} borderRadius={2} width="30%">
      <form.Field
        name="email"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Email jest wymagany";
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.value)) {
              return "Nieprawidłowy adres email";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
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
        name="password"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Hasło jest wymagane";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Hasło"
              type="password"
            />

            <ErrorText errors={field.state.meta.errors} />
          </>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <LoadingButton
            onClick={form.handleSubmit}
            variant="contained"
            disabled={!canSubmit}
            loading={isSubmitting}
          >
            Zaloguj się
          </LoadingButton>
        )}
      />

      <Link to={AppRoutes.auth.register}>
        <Typography variant="body2" mt={2} sx={{ textDecoration: "underline" }}>
          Nie masz konta? Zarejestruj się
        </Typography>
      </Link>
    </Stack>
  );
}
