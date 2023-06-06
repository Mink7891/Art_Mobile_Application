import React from 'react';
import Layout from "../components/layout";
import Header from "../components/Header";
import VideoCourses from "./VideoCourses";

const VideoCoursesPage = () => {
  return (
    <Layout>
      <Header/>
      <VideoCourses/>
    </Layout>
  );
};

export default VideoCoursesPage;
