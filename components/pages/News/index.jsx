'use client';
import React from "react"
import PropTypes from "prop-types"
import NewsContainer from "./Container";
import { Helmet } from "@/lib/helmet";


class StaticNewsPage extends React.Component {
  render() {
    console.log(this.props.blog_id)
    return (
      <>
        <Helmet>
          <title>ClanConnect - News</title>
          <link rel="canonical" href="https://www.clanconnect.ai/news" />
          <meta name="robots" content="index, follow" />
          <meta property="og:url" content="https://www.clanconnect.ai/news" />
          <meta property="og:title" content="ClanConnect - News" />
          <meta property="og:description" content="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers." />
          <meta property="og:image" content="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/in-news.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" />
        </Helmet>
        <NewsContainer />
        {/* <Investors /> */}
      </>
    );
  }
}

StaticNewsPage.propTypes = {
  greeting: PropTypes.string
};
export default StaticNewsPage
