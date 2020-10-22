import { useState } from 'react';
import PropTypes from 'prop-types';

import CustomLink from './link';
import styles from '../../styles/components/nav.module.scss';

function LinkContainer({ className }) {
  return (
    <div className={className}>
      <CustomLink href="/">home</CustomLink>
      <CustomLink href="/work">work</CustomLink>
      <CustomLink href="/blog">blog</CustomLink>
      <CustomLink href="/photography">photography</CustomLink>
    </div>
  );
}

LinkContainer.propTypes = {
  className: PropTypes.string.isRequired,
};

export default function Nav() {
  const [navOpen, toggleNav] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.nameHeading}>beth qiang</h1>
        <button type="button" className={styles.menuBtn} onClick={() => toggleNav(!navOpen)}>
          menu
        </button>
      </div>
      { navOpen && (
        <div className={styles.modal}>
          <button type="button" className={styles.closeBtn} onClick={() => toggleNav(!navOpen)}>
            close
          </button>
          <LinkContainer className={styles.mobileLinkContainer} />
        </div>
      )}
      <LinkContainer className={styles.desktopLinkContainer} />
    </div>
  );
}
