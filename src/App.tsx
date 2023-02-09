
import './App.css';
import styled, {createGlobalStyle, keyframes, ThemeProvider} from "styled-components";
import Router  from './Router';
import { RouterProvider } from 'react-router-dom';
import {ReactQueryDevtools} from "react-query/devtools"
import { DarkTheme, LightTheme, Theme } from './theme';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './Routes/atoms';
//Add type
const Box = styled.div`
  background-color: ${(props)=> props.theme.bgColor};
`;
const H1 = styled.h1`
  color : ${(props)=> props.theme.textColor};
`;
//createGlobalStyle은 styledcomponent안에있는 property이다.
//한 컴포넌트를 만들 수 있게 해주는데 랜더링될때,  그 컴포넌트는 전역스코프에 스타일을 올려준다.
const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
    /* HTML5 display-role reset for older browsers */
    *{
      box-sizing: border-box;
    }
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    body {
      line-height: 1;
      font-family: 'Source Sans Pro', sans-serif;
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    a{
      text-decoration: none;
      color: inherit;
    }
    button{
      background-color: ${(props) => props.theme.accentColor};
    }
`;

function App() {
  // const [isDark, setIsDark] = useState(false);
  // const toggle = () => {
  //setIsDark( current => !current);
  /**
     * When you want to use the current state is better to use the function. If you use a function React will put the previous value there.
     * Using !isDark might cause a bug because isDark might change from somewhere else.
     */
  //}
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <><ThemeProvider theme={isDark?DarkTheme:LightTheme}>
      <GlobalStyle />
      <RouterProvider router={Router} />
      <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider></>
  );
}

export default App;

