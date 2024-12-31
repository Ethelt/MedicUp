import {
  ApiRoutes,
  PatientRegisterErrorDto,
  PatientRegisterRequestDto,
  PatientRegisterResponseDto,
  typedKeys,
} from "@medicup/shared";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Api } from "../../../api";
import { ErrorText } from "../../../components/ErrorText";

type RegisterForm = {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  pesel: string;
  passportNumber: string;
  identityMethod: "pesel" | "passport";
};

export default function Register() {
  const form = useForm<RegisterForm>({
    defaultValues: {
      email: "bartek@test.com",
      password: "Test1234!",
      confirmPassword: "Test1234!",
      firstName: "Adam",
      lastName: "Kowalski",
      pesel: "12345678901",
      passportNumber: "",
      phoneNumber: "123456789",
      identityMethod: "pesel",
    },
    onSubmit: async (values) => {
      const partialData = {
        email: values.value.email,
        phoneNumber: values.value.phoneNumber,
        password: values.value.password,
        firstName: values.value.firstName,
        lastName: values.value.lastName,
      };

      let data: PatientRegisterRequestDto;
      if (values.value.identityMethod === "pesel" && values.value.pesel) {
        data = {
          ...partialData,
          pesel: values.value.pesel,
        };
      } else if (
        values.value.identityMethod === "passport" &&
        values.value.passportNumber
      ) {
        data = {
          ...partialData,
          passportNumber: values.value.passportNumber,
        };
      } else {
        throw new Error("No identity method selected");
      }

      const response = await Api.post<
        PatientRegisterRequestDto,
        PatientRegisterResponseDto,
        PatientRegisterErrorDto
      >(ApiRoutes.auth.registerPatient, data);

      if (response.ok) {
        console.log("Success", response.data);
      } else {
        if ("message" in response.error) {
          console.log("Error", response.error.message);
        } else {
          const fieldsError = response.error;
          typedKeys(fieldsError).forEach((field) => {
            form.setFieldMeta(field, (prev) => ({
              ...prev,
              errorMap: {
                onChange: fieldsError[field],
              },
            }));
          });
        }
      }
    },
  });

  const toggleIdentityMethod = () => {
    const currentMethod = form.getFieldValue("identityMethod");
    if (currentMethod === "pesel") {
      form.setFieldValue("identityMethod", "passport");
      form.setFieldValue("pesel", "");
      form.setFieldMeta("pesel", (prev) => ({
        ...prev,
        errorMap: {
          onChange: null,
          onSubmit: null,
        },
      }));
    } else {
      form.setFieldValue("identityMethod", "pesel");
      form.setFieldValue("passportNumber", "");
      form.setFieldMeta("passportNumber", (prev) => ({
        ...prev,
        errorMap: {
          onChange: null,
          onSubmit: null,
        },
      }));
    }
  };

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
        name="phoneNumber"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Numer telefonu jest wymagany";
            }

            if (!/^\d{9}$/.test(value.value)) {
              return "Nieprawidłowy numer telefonu";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
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
        key="pesel"
        name="pesel"
        validators={{
          onChange: (value) => {
            if (form.getFieldValue("identityMethod") !== "pesel") {
              return;
            }

            if (!value.value) {
              return "Numer PESEL jest wymagany";
            }
            if (!/^\d{11}$/.test(value.value)) {
              return "Nieprawidłowy numer PESEL";
            }
          },
        }}
        children={(field) =>
          form.getFieldValue("identityMethod") === "pesel" ? (
            <>
              <TextField
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label="Numer PESEL"
              />
              <ErrorText errors={field.state.meta.errors} />
            </>
          ) : (
            <></>
          )
        }
      />

      <form.Field
        key="passportNumber"
        name="passportNumber"
        validators={{
          onChange: (value) => {
            if (form.getFieldValue("identityMethod") !== "passport") {
              return;
            }

            if (!value.value) {
              return "Numer paszportu jest wymagany";
            }
            if (!/^[A-Z0-9]{8,9}$/.test(value.value)) {
              return "Nieprawidłowy numer paszportu";
            }
          },
        }}
        children={(field) =>
          form.getFieldValue("identityMethod") === "passport" ? (
            <>
              <TextField
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label="Numer paszportu"
              />
              <ErrorText errors={field.state.meta.errors} />
            </>
          ) : (
            <></>
          )
        }
      />

      <form.Field
        name="password"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Hasło jest wymagane";
            }

            if (
              !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                value.value
              )
            ) {
              return "Hasło musi zawierać minimum 8 znaków, jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny";
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

      <form.Field
        name="confirmPassword"
        validators={{
          onChange: (value) => {
            if (!value.value) {
              return "Potwierdzenie hasła jest wymagane";
            }

            if (value.value !== form.getFieldValue("password")) {
              return "Hasła nie są takie same";
            }
          },
        }}
        children={(field) => (
          <>
            <TextField
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Potwierdź hasło"
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
            Zarejestruj się
          </LoadingButton>
        )}
      />

      <Typography
        variant="body2"
        mt={2}
        onClick={toggleIdentityMethod}
        sx={{ textDecoration: "underline", cursor: "pointer" }}
      >
        {form.getFieldValue("identityMethod") === "pesel"
          ? "Nie posiadam numeru PESEL"
          : "Posiadam numer PESEL"}
      </Typography>
    </Stack>
  );
}
