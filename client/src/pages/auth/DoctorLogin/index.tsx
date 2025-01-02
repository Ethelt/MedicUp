import {
  ApiRoutes,
  DoctorLoginRequestDto,
  DoctorLoginResponseDto,
} from "@medicup/shared";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import { Api } from "../../../api";
import { ErrorText } from "../../../components/ErrorText";
import { AppRoutes } from "../../../constants/AppRoutes";

type DoctorLoginForm = {
  login: string;
  password: string;
};

export default function DoctorLogin() {
  const navigate = useNavigate();

  const form = useForm<DoctorLoginForm>({
    defaultValues: {
      login: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await Api.post<
        DoctorLoginRequestDto,
        DoctorLoginResponseDto
      >(ApiRoutes.auth.loginDoctor, values.value);

      if (response.ok) {
        navigate(AppRoutes.doctor.home);
      } else {
        console.error("Error", response.error);
        // @TODO: error handling
      }
    },
  });

  return (
    <Stack border="1px solid black" p={2} borderRadius={2} width="30%">
      <form.Field
        name="login"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Login jest wymagany";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Login"
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
    </Stack>
  );
}
