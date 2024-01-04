import React from 'react';
import styled from 'styled-components';
import { Body3 } from 'styles/font';
import { ReactComponent as LogoText } from 'assets/icons/logo-text.svg';
import { ReactComponent as Char1 } from 'assets/characters/char9.svg';
import { ReactComponent as Char2 } from 'assets/characters/char2.svg';

import { Green, Grey6, LightGreen, LightRed, Red } from 'styles/color';
import { Button } from './Button';
interface HomeAboutFooterSectionProps {
  isBuyer: boolean;
}
export const HomeAboutFooterSection = ({ isBuyer }: HomeAboutFooterSectionProps) => {
  return (
    <>
      <AboutSection isBuyer={isBuyer}>
        <Body3 margin="2rem 0 0.4rem">
          경험 공유 기반 연애상담 마켓플레이스
        </Body3>
        <LogoText width="132px" height="22px" />
        <div className="character">
          <Char1 />
          <Char2 />
        </div>
        <Button
          text="About 셰어마인드"
          width="80%"
          height="5.1rem"
          buttonTextType={1}
          backgroundColor={isBuyer ? Green : Red}
          borderRadius="1.2rem"
        ></Button>
      </AboutSection>
      <Footer>
        <FooterLinkList>
          <Body3>고객센터</Body3>
          <Body3>이용약관</Body3>
          <Body3>개인정보처리방침</Body3>
        </FooterLinkList>
      </Footer>
    </>
  );
};

const AboutSection = styled.div<HomeAboutFooterSectionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.6rem;
  height: 24.5rem;
  background-color: ${(props) => (props.isBuyer ? LightGreen : LightRed)};
  .character {
    display: flex;
    margin: 1.3rem 0px 2.1rem;
    align-items: flex-end;
    gap: 0.6rem;
  }
`;

const Footer = styled.section``;
const FooterLinkList = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.4rem;
  gap: 2.4rem;
  margin-top: 1.5rem;
  border-top: 1px solid ${Grey6};
  border-bottom: 1px solid ${Grey6};
`;
export default HomeAboutFooterSection;
