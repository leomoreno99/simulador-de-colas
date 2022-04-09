import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{
    /* background-color: #788CEB; */
    background-image: url('https://papers.co/wallpaper/papers.co-vk66-samsung-galaxy-polyart-pastel-blue-violet-pattern-36-3840x2400-4k-wallpaper.jpg');
    background-attachment: fixed;
    background-size: cover;
  }
  .container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
  }
`;
export default GlobalStyles;
