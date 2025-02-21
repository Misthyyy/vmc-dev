import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Typography,
  Pagination,
} from "@mui/material";
import { Donor, fetchSheetData } from "../data/fetchSheet";

const medalIcons = ["🥇", "🥈", "🥉"];

const TopDonorsTable = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("just now");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const getDonors = async () => {
      const { donors, lastUpdate } = await fetchSheetData();
      setDonors(donors);
      setLastUpdate(lastUpdate);
    };

    getDonors();
  }, []);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const sortedDonors = [...donors].sort((a, b) => b.amount - a.amount);
  const startIndex = (page - 1) * rowsPerPage;
  const displayedDonors = sortedDonors.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "80%" },
        margin: "auto",
        textAlign: "center",
        padding: { xs: 2, sm: 3 },
        borderRadius: "15px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "20px",
          fontFamily: "Goldman, serif",
          color: "rgba(255, 255, 255, 0.9)",
          WebkitTextStroke: "1px #ffff",
        }}
      >
        DONOR LIST
      </Typography>
      <Typography
        sx={{
          fontFamily: "Play",
          fontSize: "1em",
          color: "whitesmoke",
          textAlign: "center",
          mb: 2,
        }}
      >
        Last updated {lastUpdate}
      </Typography>
      <TableContainer sx={{ p: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& > *": { textAlign: "center" } }}>
              <TableCell
                sx={{
                  fontFamily: "Goldman",
                  fontSize: "1.3em",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Rank
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Goldman",
                  fontSize: "1.3em",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Goldman",
                  fontSize: "1.3em",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedDonors.map((donor, index) => (
              <TableRow
                key={donor.id}
                sx={{
                  "&:hover": {
                    background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "Play",
                    fontSize: "1.8em",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {startIndex + index < 3
                    ? medalIcons[startIndex + index]
                    : startIndex + index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Play",
                    fontSize: "1.2em",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {donor.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Play",
                    fontSize: "1.2em",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {donor.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {donors.length > rowsPerPage && (
        <Pagination
          count={Math.ceil(donors.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .Mui-selected": {
              background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
              color: "black",
              fontWeight: "bold",
            },
          }}
        />
      )}
    </Card>
  );
};

export default TopDonorsTable;
