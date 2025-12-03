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

const PostForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    status: "unpublished",
    metaTitle: "",
    metaDescription: "",
  });

  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const loadPost = async () => {
    if (!id) return;
    const res = await api.get(`/posts/${id}`);
    setForm({
      title: res.data.title || "",
      excerpt: res.data.excerpt || "",
      category: res.data.category || "",
      status: res.data.status || "published",
      metaTitle: res.data.metaTitle || "",
      metaDescription: res.data.metaDescription || "",
    });
    setContent(res.data.content || "");
    setImagePreview(res.data.imageUrl || "");
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
    if (selected) setImagePreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("content", content);

      if (file) formData.append("file", file);

      if (isEdit) {
        await api.put(`/posts/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/posts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box className="max-w-5xl mx-auto px-4 py-6">
      <Typography variant="h4" fontWeight={600} mb={3}>
        {isEdit ? "Edit Post" : "New Post"}
      </Typography>

      <Card className="shadow-lg rounded-xl">
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Title"
              fullWidth
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <TextField
              label="Excerpt"
              fullWidth
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
            />

            <TextField
              label="Category"
              fullWidth
              name="category"
              value={form.category}
              onChange={handleChange}
            />

            <Box>
              <Typography variant="subtitle2" mb={1}>
                Featured Image
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block"
              />
            </Box>

            {/* Editor */}
            <Box>
              <Typography variant="subtitle2" mb={1}>
                Content
              </Typography>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your blog content here..."
                style={{ minHeight: 250 }}
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

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {imagePreview && (
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Preview
                </Typography>

                <Box
                  className="border rounded-lg p-2 bg-gray-50 flex justify-center items-center"
                  style={{
                    maxWidth: 400,
                    maxHeight: 400,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            )}

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Box className="flex justify-end gap-3 pt-4">
              <Button variant="outlined" onClick={() => navigate("/posts")}>
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

export default PostForm;
