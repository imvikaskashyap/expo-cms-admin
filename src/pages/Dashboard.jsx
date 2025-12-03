import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import api from "../api/axios.js";

const Dashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    publishedPosts: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, pagesRes] = await Promise.all([
          api.get("/posts"),
          api.get("/pages"),
        ]);
        const posts = postsRes.data || [];
        const pages = pagesRes.data || [];
        setStats({
          posts: posts.length,
          publishedPosts: posts.filter((p) => p.status === "published").length,
          pages: pages.length,
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" className="mb-6">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Total Posts</Typography>
            <Typography variant="h3">{stats.posts}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Published Posts</Typography>
            <Typography variant="h3">{stats.publishedPosts}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Pages</Typography>
            <Typography variant="h3">{stats.pages}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
