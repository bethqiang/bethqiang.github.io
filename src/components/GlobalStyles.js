import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fonts}
  }
`;

export default GlobalStyle;
