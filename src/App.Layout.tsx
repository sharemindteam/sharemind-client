import React from 'react';
import backgroundImage from 'assets/background/background.png';

//
//
//

interface AppLayoutProps {
  children: React.ReactNode;
}

//
//
//

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export default AppLayout;
