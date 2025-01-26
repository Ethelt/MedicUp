import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { AppRoutes } from "../../constants/AppRoutes";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <Stack
            height="100vh"
            justifyContent="center"
            alignItems="center"
            spacing={4}
        >
            {/* Header Section */}
            <Stack direction="column" alignItems="center" spacing={2}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontSize: "1.5rem" }}
                >
                    Dzień dobry, witamy w
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    {/* Logo */}
                    <Box
                        component="div"
                        sx={{
                            width: 60,
                            height: 60,
                        }}
                    >
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 193 229"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    style={{
                                        fill: "#3765ff",
                                        fillOpacity: 1,
                                        strokeWidth: 0.264583,
                                    }}
                                    d="M 0.3001292,75.380593 H 37.953427 L 57.972755,0.667449 109.93747,194.60242 138.49254,88.03344 h 55.06891 v 7.71067 H 145.53428 L 109.69998,229.47956 57.942579,36.318323 45.251496,83.68209 H 0.3001292 Z"
                                />
                            </g>
                        </svg>
                    </Box>

                    {/* Styled Text */}
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            color: "#4a75ff",
                        }}
                    >
                        MedicUp
                    </Typography>

                    {/* Empty Spacer */}
                    <Box
                        component="div"
                        sx={{
                            width: 60,
                            height: 1,
                        }}
                    />
                </Stack>
            </Stack>

            {/* Buttons Section */}
            <Box
                sx={{
                    backgroundColor: "#f9f9f9",
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
            >
                <Stack spacing={2} alignItems="center" width="300px">
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(AppRoutes.auth.login.patient)}
                    >
                        Zaloguj się
                    </LoadingButton>
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(AppRoutes.auth.register)}
                    >
                        Rejestracja
                    </LoadingButton>
                </Stack>
            </Box>
        </Stack>
    );
}
