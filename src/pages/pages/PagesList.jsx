import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";

const PagesList = () => {
  const [pages, setPages] = useState([]);

  const loadPages = async () => {
    const res = await api.get("/pages");
    setPages(res.data || []);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this page?")) return;
    await api.delete(`/pages/${id}`);
    loadPages();
  };

  return (
    <Box>
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h4">Pages</Typography>
        <Button
          variant="contained"
          component={Link}
          to="/pages/new"
        >
          New Page
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.status}</TableCell>
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    to={`/pages/${page.id}`}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(page.id)}
                    size="small"
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No pages yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default PagesList;
