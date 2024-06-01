import React from 'react';
import backgroundImage from 'assets/background/background.png';

//
//
//

interface AppLayoutProps {
  children: React.ReactNode;
}

const LAYOUT_STYLES = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh',
};

//
//
//

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div style={LAYOUT_STYLES}>{children}</div>;
};

export default AppLayout;
