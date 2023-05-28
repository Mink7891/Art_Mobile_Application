import React from 'react';
import Layout from "../components/layout";
import Header from "../components/Header";
import RatingTable from "../ratingTable/RatingTable";

const RatingPage = () => {
  return (
    <Layout>
      <Header/>
      <RatingTable/>
    </Layout>
  );
};

export default RatingPage;
