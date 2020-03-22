import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import theme from '../theme';

// todo: make this responsive

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects/' },
  { label: 'About', to: '/about/' },
  { label: 'Blog', to: '/blog/' },
];

const NavList = styled.ul`
  padding-left: 0px;
  padding-top: 10px;
  list-style-type: none;
  display: flex;
  justify-content: center;
`;

const NavListItem = styled.li`
  margin: 5px 20px;
`;

// eslint-disable-next-line react/jsx-props-no-spreading
const NavLink = styled((props) => <Link {...props} />)`
  color: ${(props) => props.theme.colors.black};
  &:visited {
    color: ${(props) => props.theme.colors.black};
  }
  &:hover {
    border-bottom: solid 1px ${(props) => props.theme.colors.black};

  }
`;

const activeLink = {
  paddingBottom: '4px',
  backgroundImage: `linear-gradient(to right, ${theme.colors.pink}, ${theme.colors.purple})`,
  backgroundPosition: 'left bottom',
  backgroundRepeat: 'no-repeat',
  backgroundColor: `${theme.colors.white}`,
  backgroundSize: '100% 4px',
  borderBottom: 'none',
};

function Header() {
  return (
    <nav>
      <NavList>
        { links.map((link) => (
          <NavListItem key={link.label}>
            <NavLink to={link.to} activeStyle={activeLink}>
              {link.label}
            </NavLink>
          </NavListItem>
        ))}
      </NavList>
    </nav>
  );
}

export default Header;
