import {
  ApiRoutes,
  PatientLoginRequestDto,
  PatientLoginResponseDto,
} from "@medicup/shared";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Api } from "../../../api";
import { ErrorText } from "../../../components/ErrorText";

type PatientLoginForm = {
  email: string;
  password: string;
};

export default function PatientLogin() {
  const form = useForm<PatientLoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await Api.post<
        PatientLoginRequestDto,
        PatientLoginResponseDto
      >(ApiRoutes.auth.loginPatient, values.value);

      if (response.ok) {
        console.log("succ", response.data);
      } else {
        console.log("err", response.error);
      }
    },
  });

  return (
    <Stack border="1px solid black" p={2} borderRadius={2}>
      <form.Field
        name="email"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Email is required";
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

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <LoadingButton
            onClick={form.handleSubmit}
            variant="contained"
            disabled={!canSubmit}
            loading={isSubmitting}
            sx={{ mt: 1 }}
          >
            Login
          </LoadingButton>
        )}
      />
    </Stack>
  );
}
