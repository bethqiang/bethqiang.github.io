import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects/' },
  { label: 'About', to: '/about/' },
  { label: 'Blog', to: '/blog/' },
];

const Nav = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;

const LinkContainer = styled.div`
  margin: 5px 20px;
`;

function Header() {
  return (
    <Nav>
      { links.map((link) => (
        <LinkContainer>
          <Link to={link.to}>{link.label}</Link>
        </LinkContainer>
      ))}
    </Nav>
  );
}

export default Header;
