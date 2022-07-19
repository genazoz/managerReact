import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: ${theme.fontSizes.M};
    font-family: ${theme.fonts.NotoSans};
    font-weight: 400;
    color: white;
    background: #FFFFFF;
  }

  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fullpage-wrapper {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a, p {
    font-family: ${theme.fonts.NotoSans};
    font-size: ${theme.fontSizes.M};
    color: rgba(59, 59, 59, 1);
  }

  li {
    list-style-type: none;
  }

  input, button {
    outline: none;
    font-family: ${theme.fonts.NotoSans};
  }
  
  input {
    font-size: ${theme.fontSizes.M};
    line-height: 20px;
    color: #3B3B3B;

    border:             none;
    background-image:   none;
    background-color:   transparent;
    box-shadow:         none;
    appearance:         none;
    
    &:focus {
      outline: none;
    }
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
  }

  #fp-nav ul li a span {
    background: #FFFFFF;
  }

  \:root {
    --unit: calc((100vw - 1650px) / 2);
    @media (max-width: ${theme.media.desktop}) {
      --unit: 85px;
    }
    @media (max-width: ${theme.media.desktopMd}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.tab}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.tabMd}) {
      --unit: 32px;
    }
    @media (max-width: ${theme.media.mob}) {
      --unit: 24px;
    }
  }
  
  h1, h2, h3, h4 {
    font-family: ${theme.fonts.NotoSans};
    font-weight: 400;
    color: #222222;
  }
  h4 {
    font-size: 20px;
    line-height: 24px;
  }
`;

export default GlobalStyles;
