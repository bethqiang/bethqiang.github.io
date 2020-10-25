import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import CustomLink from './link';
import styles from '../../styles/components/nav.module.scss';

const variants = {
  open: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function MobileLinkContainer({ links, navOpen, className }) {
  return (
    <motion.ul
      variants={variants}
      animate={navOpen ? 'open' : 'closed'}
      className={`${styles.menuList} ${className}`}
    >
      { links.map((link) => (
        <CustomLink
          href={link.href}
          key={link.label}
        >
          {link.label}
        </CustomLink>
      ))}
    </motion.ul>
  );
}

MobileLinkContainer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  navOpen: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

MobileLinkContainer.defaultProps = {
  navOpen: false,
};
