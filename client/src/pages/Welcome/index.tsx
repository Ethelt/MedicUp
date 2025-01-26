import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { AppRoutes } from "../../constants/AppRoutes";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <Stack
            height="100vh"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Typography variant="h4" fontWeight="bold">
                Welcome to MedicUp
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate(AppRoutes.auth.login.patient)}
            >
                Login
            </Button>
            <Button
                variant="contained"
                onClick={() => navigate(AppRoutes.auth.register)}
            >
                Register
            </Button>
        </Stack>
    );
}
