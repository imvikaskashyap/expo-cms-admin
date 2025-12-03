import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import api from "../../api/axios.js";

const PageForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    status: "published",
    metaTitle: "",
    metaDescription: "",
  });

  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      if (!id) return;
      const res = await api.get(`/pages/${id}`);
      setForm({
        title: res.data.title || "",
        status: res.data.status || "published",
        metaTitle: res.data.metaTitle || "",
        metaDescription: res.data.metaDescription || "",
      });
      setContent(res.data.content || "");
    };

    loadPage();
  }, [id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...form,
        content,
      };

      if (isEdit) {
        await api.put(`/pages/${id}`, payload);
      } else {
        await api.post(`/pages`, payload);
      }
      navigate("/pages");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box>
      <Typography variant="h4" className="mb-4">
        {isEdit ? "Edit Page" : "New Page"}
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Title"
              fullWidth
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <Box>
              <Typography variant="subtitle2" className="mb-1">
                Content
              </Typography>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your page content here..."
              />
            </Box>

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="unpublished">Unpublished</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </TextField>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Meta Title"
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Meta Description"
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Box className="flex justify-end gap-2">
              <Button
                variant="outlined"
                onClick={() => navigate("/pages")}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PageForm;
