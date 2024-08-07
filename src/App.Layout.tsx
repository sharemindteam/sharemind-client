import React from 'react';
import backgroundImage from 'assets/background/background.png';
import backgroundLogoImage from 'assets/background/background_logo.png';
import backgroundTextImage from 'assets/background/background_text.png';
import backgroundIconsImage from 'assets/background/background_sub_icons.png';
import backgroundButtonImage from 'assets/background/background_button.png';

import styled from 'styled-components';
import { Green } from 'styles/color';
import { Flex } from 'components/Common/Flex';
import { useNavigate } from 'react-router-dom';
import { useViewResize } from 'hooks/useViewResize';
//
//
//

interface AppLayoutProps {
  children: React.ReactNode;
}

//
//
//

const BACKGROUND_LEFT_RIGHT_RATIO = 3;

const GROUND_HEIGHT = '24rem';

const LAYOUT_STYLES = {
  width: '100vw',
  height: '  height: calc(var(--vh, 1vh) * 100);',
  display: 'flex',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const LeftSection = styled.div`
  position: relative;
  flex: ${BACKGROUND_LEFT_RIGHT_RATIO};
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  position: relative;
  flex: 1;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 40rem;
  padding: 0;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const ButtonWrapper = styled.div`
  max-width: 40rem;
  padding: 0;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const BottomGreenBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${GROUND_HEIGHT};
  bottom: 0;
  background-color: ${Green};
`;

//
//
//

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();

  useViewResize();

  //
  //
  //

  return (
    <div style={LAYOUT_STYLES}>
      <LeftSection>
        <IconWrapper>
          <Flex direction="column" gap="1rem" style={{ flex: 1 }}>
            <StyledImg src={backgroundTextImage} alt="bg-text" />
            <StyledImg src={backgroundLogoImage} alt="bg-logo" />
          </Flex>
          <StyledImg
            src={backgroundIconsImage}
            alt="bg-icons"
            style={{ marginBottom: GROUND_HEIGHT }}
          />
        </IconWrapper>
        <BottomGreenBox>
          <ButtonWrapper>
            <StyledImg
              src={backgroundButtonImage}
              alt="bg-button"
              onClick={() => {
                navigate('/service');
              }}
              style={{ cursor: 'pointer' }}
            />
          </ButtonWrapper>
        </BottomGreenBox>
      </LeftSection>
      <div>{children}</div>
      <RightSection>
        <BottomGreenBox />
      </RightSection>
    </div>
  );
};

export default AppLayout;
