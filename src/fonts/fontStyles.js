import { createGlobalStyle } from "styled-components";

import NotoSansRegular from "./NotoSans-Regular.ttf";
import NotoSansLight from "./NotoSans-Light.ttf";
import NotoSansSemiBold from "./NotoSans-SemiBold.ttf";
import NotoSansBold from "./NotoSans-Bold.ttf";

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'NotoSans';
    src: url(${NotoSansLight}) format('truetype');
    font-style: normal;
    font-weight: 300;
  }
  @font-face {
    font-family: "NotoSans";
    src: url(${NotoSansRegular}) format('truetype');
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: 'NotoSans';
    src: url(${NotoSansSemiBold}) format('truetype');
    font-style: normal;
    font-weight: 600;
  }
  @font-face {
    font-family: 'NotoSans';
    src: url(${NotoSansBold}) format('truetype');
    font-style: normal;
    font-weight: 700;
  }
`;

export default FontStyles;
