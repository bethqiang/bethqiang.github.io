import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fonts};
    font-size: 15px;
    background-color: ${(props) => props.theme.colors.white}
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: 30px;
  }
`;

export default GlobalStyles;
