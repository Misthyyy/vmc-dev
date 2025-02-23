// src/components/DonationInfo.jsx
import { Box, Card, Typography, Button, Divider } from "@mui/material";

export default function DonationInfo() {
  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "80%" },
        margin: "auto",
        textAlign: "center",
        padding: 5,
        borderRadius: "15px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        boxShadow: 3,
      }}
    >
      {/* Donation Amount Title */}
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "24px", sm: "30px" },
          marginBottom: "15px",
          fontFamily: "Goldman, serif",
          color: "rgba(255, 255, 255, 0.9)",
          WebkitTextStroke: "1px #ffff",
        }}
      >
        DONATE INFORMATION
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}
      >
        <img
          src="/QRcode.svg"
          alt="QR Code"
          style={{
            width: "100%",
            maxWidth: "250px",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "Goldman",
          fontSize: { xs: "1.5em", sm: "2em" },
          fontWeight: "bold",
          color: "whitesmoke",
        }}
      >
        VIETCOMBANK THANH DA
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Goldman",
          fontSize: { xs: "1.2em", sm: "1.5em" },
          color: "whitesmoke",
        }}
      >
        053 100 258 3237
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Goldman",
          fontSize: { xs: "1.2em", sm: "1.5em" },
          color: "whitesmoke",
          marginBottom: "10px",
        }}
      >
        TRAN HOANG PHUONG LINH
      </Typography>
      <Divider color="#fff" />
      {/* Reminder Text */}
      <Typography
        sx={{
          fontFamily: "Goldman",
          fontSize: { xs: "1em", sm: "1.2em" },
          color: "lightgray",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        Please fill out the form after completing your donation.
      </Typography>

      {/* Form Button */}
      <Button
        variant="contained"
        href="https://forms.gle/gSWaJc5T7fULBM2r8"
        target="_blank"
        sx={{
          backgroundColor: "#ff69b4",
          color: "white",
          fontFamily: "Goldman",
          fontSize: { xs: "1em", sm: "1.2em" },
          "&:hover": {
            color: "#fff",
            backgroundColor: "#ff1493",
          },
        }}
      >
        Form Donate
      </Button>
    </Card>
  );
}
