'use client';
import React from 'react';
import { Helmet } from '@/lib/helmet';
import PropTypes from 'prop-types';

const SEO = ({ title, description, type, url, image, alt }) => {
  return (
      <Helmet>
          { /* Standard metadata tags */}
          <title>{title}</title>
          <link rel="canonical" href={url} />
          <meta name="robots" content="index, follow" />
          <meta property="og:url" content={url} />
          <meta name='description' content={description} />
          { /* End standard metadata tags */}
          { /* Facebook tags */}
          <meta property="og:type" content={type} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" />
          <meta property="og:image:alt" content={alt} />
          { /* End Facebook tags */}
      </Helmet>
  )
}

export default SEO
SEO.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string.isRequired,
    image: PropTypes.string,
    alt: PropTypes.string,
};

SEO.defaultProps = {
    description: '',
    type: 'website',
    image: '',
    alt: '',
};
