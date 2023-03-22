// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string,
    cardColor: string,
    boardColor: string,
    accentColor: string,
  }
}