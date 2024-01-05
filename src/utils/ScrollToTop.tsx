import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
interface ScrollToTopProps {
  children: React.ReactNode;
}
export default function ScrollToTop(props: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Scrolling to top');
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
}
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // "document.documentElement.scrollTo" is the magic for React Router Dom v6
//     document.documentElement.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: 'instant', // Optional if you want to skip the scrolling animation
//     });
//   }, [pathname]);

//   return null;
// }
