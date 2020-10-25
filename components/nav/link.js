import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import styles from '../../styles/components/nav.module.scss';

const variants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -20,
  },
};

export default function CustomLink({ href, children }) {
  const router = useRouter();

  let classes = styles.navLink;
  if (router.pathname === href) {
    classes = `${classes} ${styles.linkActive}`;
  }

  return (
    <motion.li
      variants={variants}
      className={styles.menuItem}
    >
      <a href={href} className={classes}>
        {children}
      </a>
    </motion.li>
  );
}

CustomLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
