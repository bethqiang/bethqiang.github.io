import PropTypes from 'prop-types';
import Head from 'next/head';

import Nav from './nav/nav';
import styles from '../styles/components/layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Beth Qiang</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/foh8ntp.css" />
        <link rel="preload" href="/fonts/Vesterbro-Poster.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Vesterbro-Poster.woff" as="font" crossOrigin="" />
      </Head>
      <div className={styles.container}>
        <Nav />
        {children}
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
