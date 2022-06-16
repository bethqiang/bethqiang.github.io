import PropTypes from 'prop-types';

import CustomLink from './link';
import styles from '../../styles/components/nav.module.scss';

export default function DesktopLinkContainer({ links, className }) {
  return (
    <ul className={`${styles.menuList} ${className}`}>
      { links.map((link) => (
        <CustomLink
          href={link.href}
          key={link.label}
        >
          {link.label}
        </CustomLink>
      ))}
    </ul>
  );
}

DesktopLinkContainer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.exact({
    label: PropTypes.string,
    href: PropTypes.string,
  })).isRequired,
  className: PropTypes.string.isRequired,
};
