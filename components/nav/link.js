import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import styles from '../../styles/components/nav.module.scss';

export default function CustomLink({ href, children }) {
  const router = useRouter();

  let classes = styles.navLink;
  if (router.pathname === href) {
    classes = `${classes} ${styles.linkActive}`;
  }

  return <a href={href} className={classes}>{children}</a>;
}

CustomLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
