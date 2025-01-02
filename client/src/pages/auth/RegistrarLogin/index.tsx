import {
  ApiRoutes,
  RegistrarLoginRequestDto,
  RegistrarLoginResponseDto,
} from "@medicup/shared";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import { Api } from "../../../api";
import { ErrorText } from "../../../components/ErrorText";
import { AppRoutes } from "../../../constants/AppRoutes";

type RegistrarLoginForm = {
  login: string;
  password: string;
};

export default function RegistrarLogin() {
  const navigate = useNavigate();

  const form = useForm<RegistrarLoginForm>({
    defaultValues: {
      login: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await Api.post<
        RegistrarLoginRequestDto,
        RegistrarLoginResponseDto
      >(ApiRoutes.auth.loginRegistrar, values.value);

      if (response.ok) {
        navigate(AppRoutes.registrar.home);
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
