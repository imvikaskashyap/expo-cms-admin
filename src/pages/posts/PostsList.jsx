import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data || []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    loadPosts();
  };

  const handleTogglePublish = async (post) => {
    const newPublished = post.status !== "published";
    const res = await api.patch(`/posts/${post.id}/publish`, {
      published: newPublished,
    });
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? res.data : p))
    );
  };

  return (
    <Box>
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h4">Posts</Typography>
        <Button
          variant="contained"
          component={Link}
          to="/posts/new"
        >
          New Post
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Published At</TableCell>
              <TableCell>Publish</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.category || "-"}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={post.status === "published"}
                    onChange={() => handleTogglePublish(post)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    to={`/posts/${post.id}`}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(post.id)}
                    size="small"
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No posts yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default PostsList;
