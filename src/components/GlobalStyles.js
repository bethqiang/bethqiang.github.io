import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fonts};
    font-size: 15px;
  }
`;

export default GlobalStyles;
