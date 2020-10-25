import { useState } from 'react';
import { motion } from 'framer-motion';

import LinkContainer from './linkContainer';
import styles from '../../styles/components/nav.module.scss';

const variants = {
  open: {
    opacity: 1,
    x: 0,
  },
  closed: {
    opacity: 0,
    x: '-100%',
    transition: {
      delay: 0.8,
    },
  },
};

export default function Nav() {
  const [navOpen, toggleNav] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.nameHeading}>beth qiang</h1>
        <button
          type="button"
          onClick={() => toggleNav(true)}
          className={styles.menuBtn}
        >
          menu
        </button>
      </div>
      <motion.div
        variants={variants}
        initial="closed"
        animate={navOpen ? 'open' : 'closed'}
        transition={{ damping: 50 }}
        className={styles.modal}
      >
        <button
          type="button"
          onClick={() => toggleNav(false)}
          className={styles.closeBtn}
        >
          close
        </button>
        <LinkContainer
          navOpen={navOpen}
          className={styles.mobileLinkContainer}
        />
      </motion.div>
      <LinkContainer className={styles.desktopLinkContainer} />
    </div>
  );
}
