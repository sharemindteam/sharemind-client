import styled from 'styled-components';
import { Body3 } from 'styles/font';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Char1 } from 'assets/characters/char5.svg';
import { ReactComponent as Char2 } from 'assets/characters/minder-char2.svg';
import { Green, Grey6, LightGreen } from 'styles/color';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

//
//
//

interface HomeAboutFooterSectionProps {
  isBuyer: boolean;
}

//
//
//

export const HomeAboutFooterSection = ({
  isBuyer,
}: HomeAboutFooterSectionProps) => {
  const navigate = useNavigate();
  return (
    <>
      <AboutSection isBuyer={isBuyer}>
        <Body3 margin="2rem 0 0.4rem">
          경험 공유 기반 연애상담 마켓플레이스
        </Body3>
        <Logo width="132px" height="22px" />
        <div className="character">
          <MainChar1 />
          <MainChar2 />
        </div>
        <Button
          text="About 셰어마인드"
          onClick={() => {
            navigate('/service');
          }}
          width="80%"
          height="5.1rem"
          buttonTextType={1}
          backgroundColor={Green}
          borderRadius="1.2rem"
        ></Button>
      </AboutSection>
      <Footer>
        <FooterLinkList>
          <Body3
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.open(process.env.REACT_APP_SERVICE_CENTER_URL);
            }}
          >
            고객센터
          </Body3>
          <Body3>이용약관</Body3>
          <Body3>개인정보처리방침</Body3>
        </FooterLinkList>
      </Footer>
    </>
  );
};

const AboutSection = styled.section<HomeAboutFooterSectionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.6rem;
  height: 24.5rem;
  background-color: ${(props) => (props.isBuyer ? LightGreen : LightGreen)};
  .character {
    display: flex;
    margin: 1.3rem 0px 2.1rem;
    align-items: flex-end;
  }
`;

const MainChar1 = styled(Char1)`
  width: 80px;
  height: 64px;
  margin: 0rem -0.6rem 0;
`;

const MainChar2 = styled(Char2)`
  width: 80px;
  height: 64px;
  margin: 0rem -0.6rem 0;
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
