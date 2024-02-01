import Router from 'Router';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  // const appRef = useRef();
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   appRef?.current?.scrollTo(0, 0);
  // }, [pathname]);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
