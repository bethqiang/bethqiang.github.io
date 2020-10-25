import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import CustomLink from './link';
import styles from '../../styles/components/nav.module.scss';

const links = [
  {
    label: 'home',
    href: '/',
  },
  {
    label: 'work',
    href: '/work',
  },
  {
    label: 'blog',
    href: '/blog',
  },
  {
    label: 'photography',
    href: '/photography',
  },
];

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

export default function LinkContainer({ navOpen, className }) {
  return (
    <motion.ul
      variants={variants}
      animate={navOpen ? 'open' : 'closed'}
      className={`${styles.menuList} ${className}`}
    >
      { links.map((link) => <CustomLink href={link.href}>{link.label}</CustomLink>)}
    </motion.ul>
  );
}

LinkContainer.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};
