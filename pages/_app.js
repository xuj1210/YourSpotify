import '../styles/globals.css'
import '../styles/listPages.css'
import React from 'react'
import SwitchTransition from 'react-transition-group/SwitchTransition'
import CSSTransition from 'react-transition-group/CSSTransition'

function MyApp({ Component, pageProps, router }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition key={router.pathname} classNames='page' timeout={300}>
        <Component {...pageProps} />
      </CSSTransition>
    </SwitchTransition>
  );
  // return (
  //   <Component {...pageProps} />
  // );
}

export default MyApp
