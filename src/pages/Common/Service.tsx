import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Space } from 'components/Common/Space';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Green, Grey2, Grey3, Grey6, LightGreen } from 'styles/color';
import { Body3, Body4, Caption1, Caption2, Heading } from 'styles/font';
import SharemindLogo from 'assets/icons/logo.png';
import Figure0 from 'assets/icons/figure0.png';
import Figure1 from 'assets/icons/figure1.png';
import Figure2 from 'assets/icons/figure2.png';
import Figure3 from 'assets/icons/figure3.png';
import Figure4 from 'assets/icons/figure4.png';
import Figure5 from 'assets/icons/figure5.png';
import Figure6 from 'assets/icons/figure6.png';
import Procedure1 from 'assets/icons/procedure1.png';
import Procedure2 from 'assets/icons/procedure2.png';
import { Button } from 'components/Common/Button';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { Characters } from 'utils/Characters';

const slideArray = [
  '연애갈등',
  '이별/재회',
  '여자심리',
  '남자심리',
  '썸/연애시작',
  '짝사랑',
  '권태기',
  '기타',
];
function Service() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
    window.scrollTo(0, 0);
  }, []);
  return (
    <ServicePageContainer>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading>서비스 소개</Heading>
      </HeaderWrapper>
      {isLoading ? (
        <div
          style={{
            height: 'calc(100vh - 10rem)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <main>
            <div className="service-intro">
              <Space height="3.9rem" />
              <Body4>경험 공유 기반 연애상담 마켓플레이스</Body4>
              <Space height="0.3rem" />
              <SharemindLogoIcon src={SharemindLogo} />
              <Space height="9.3rem" />
              <img src={Figure0} alt="아래쪽 화살표" />
              <Space height="1.5em" />
              <Body3 textAlign="center">
                셰어마인드는 <br />
                <b>상담사의 경험 공유</b>를 기반으로 고민을 상담하는 <br />
                <b>온라인 연애상담 마켓 플레이스</b>입니다.
              </Body3>
            </div>

            <div className="main-caption">
              <LeftFigure src={Figure1} />
              <div className="left-caption">
                <Body3>
                  주변 사람들에게 상담할 만한 고민도 있지만
                  <br /> 그렇게 하기 <b>어려운 고민</b>도 많습니다. <br />
                  특히 연애 고민은 주변에 엮인 사람이 많을 수도 있고
                  <br /> 반복되는 상담으로 주변 사람들의 눈치가 보일 수도 있죠.
                </Body3>
                <br />
                <Body3>
                  그럴 때는 <b>나와 유사한 경험</b>을 했던, <br /> 나를{' '}
                  <b>잘 이해해줄 수 있는</b>
                  사람이 필요합니다.
                </Body3>
              </div>
              <Space height="4.7rem" />
              <RightFigure src={Figure2} />
              <div className="right-caption">
                <Body3>
                  셰어마인드에서 <b>나와 비슷한 고민</b>을 경험한
                  <br /> <b>상담사</b>에게 직접 상담을 받아보세요. <br />
                  <br />
                  썸부터 연애갈등, 권태기, 이별, 재회, 남녀심리까지 <br />
                  다양한 카테고리에서 당신의 이야기를
                  <br /> 들을 준비가 된 상담사들을 만나볼 수 있어요.
                </Body3>
              </div>
              <Space height="4.7rem" />
              <LeftFigure src={Figure3} />
              <div className="left-caption">
                <Body3>
                  연애상담을 <b>자주 요청</b>받거나 연애상담을
                  <br /> 해주는 것을 <b>즐긴다면</b>, 셰어마인드에서 <br />
                  <b>고민</b>하고 있는 사람들의 이야기를 들어주세요.
                </Body3>
              </div>
              <Space height="4.7rem" />
              <RightFigure src={Figure4} />
              <div className="right-caption2">
                <Body3>
                  셰어마인드에 상담사로 등록해
                  <br />
                  내가 <b>직접 겪은 경험</b>을 전달하며 고민을 <br />
                  <b>상담</b>해주고 <b>수입</b>도 얻어보세요.
                </Body3>
              </div>
            </div>

            <div className="slide-category">
              <SlideList>
                {Array.from({ length: 2 * 8 }, (_, i) => (i % 8) + 1).map(
                  (item) => (
                    <SliderItem>
                      <div className="char">
                        <Characters number={item} />
                        {/* 1~8 */}
                      </div>
                      <Heading>{slideArray[item - 1]}</Heading>
                    </SliderItem>
                  ),
                )}
              </SlideList>
              <SlideReverseList>
                {Array.from({ length: 2 * 8 }, (_, i) => (i % 8) + 4).map(
                  (item) => (
                    <SliderItem>
                      <div className="char">
                        {/* 0~7 */}
                        <Characters number={((item + 3) % 8) + 1} />
                      </div>
                      <Heading>{slideArray[(item + 3) % 8]}</Heading>
                    </SliderItem>
                  ),
                )}
              </SlideReverseList>
            </div>

            <div className="service-point">
              <Caption1 color={Grey3}>Service Point1</Caption1>
              <Space height="0.4rem" />
              <HightLightText>연애상담 특화 카테고리</HightLightText>
              <Space height="2.1rem" />
              <Body3>
                셰어마인드는 연애상담 특화 카테고리를 제공하고 있어요.
                <br /> 연애갈등이나 이성 심리, 썸과 연애 시작부터 권태기,
                이별까지
                <br />
                다양한 카테고리의 상담이 가능해요. <br />
                <br />
                뿐만 아니라 상담사마다 공감, 조언, 팩폭 등<br /> 상담 스타일이
                세세하게 나눠져 있어 원하는 스타일의
                <br /> 상담사를 선택할 수 있어요.
              </Body3>
            </div>
            <Space height="6rem" />
            <MainFigure src={Figure5} />
            <div className="service-point">
              <Caption1 color={Grey3}>Service Point2</Caption1>
              <Space height="0.4rem" />
              <HightLightText>실시간 채팅과 편지 상담</HightLightText>
              <Space height="2.1rem" />
              <Body3>
                당장 감정의 해소와 위로가 필요하다면 실시간 채팅 상담을,
                <br /> 나의 깊은 고민을 담아내고 정성 담긴 답변을 받아보고
                싶다면 <br />
                편지 상담을 이용해 보세요.
                <br />
                <br /> 채팅 상담은 상담사가 접속해 있다면 바로, <br />
                편지 상담은 내용 전달 후 24시간 이내에
                <br /> 상담사가 답변해 드립니다.
              </Body3>
            </div>
            <Space height="6rem" />
            <div className="main-gray">
              <Space height="3.8rem" />
              <img src={Figure6} style={{ width: '60%' }} alt="figure" />
            </div>
            <div className="service-point">
              <Caption1 color={Grey3}>Service Point3</Caption1>
              <Space height="0.4rem" />
              <HightLightText>
                상세 정보와 리뷰를 확인하고 <br />
                원하는 상담사를 찾아보세요
              </HightLightText>
              <Space height="2.4rem" />
              <Body3>
                사용자들이 남긴 생생한 상담 후기를 확인하고
                <br /> 나에게 알맞은 상담사를 찾아보세요.
                <br /> 상담사가 답답한 고민을 손쉽게 해결하고
                <br /> 마음을 돌보아 줄 수 있어요. <br />
                <br />
                상담사별로 특화된 상담 유형과 더불어
                <br /> 상담가능 시간, 상담 가격, 상담 스타일까지.
                <br /> 세세하게 제공되는 상담사의 정보를 보고
                <br /> 원하는 상담사를 고를 수 있어요.
              </Body3>
              <Space height="6rem" />
            </div>
            <div className="how-to-use">
              <Space height="3.4rem" />
              <Body4 color={Green}>How to Use</Body4>
              <Space height="0.6rem" />
              <Heading>셰어마인드 이용방법</Heading>
              <Space height="3rem" />
              <div className="flex">
                <Heading>셰어</Heading>
                <Space width="0.65rem" />
                <Body4 color={Green}>Share, 상담을 받는 사람</Body4>
              </div>
              <Space height="2rem" />
              <ProcedureImg1 src={Procedure1} />
            </div>
            <Space height="1.6rem" />
            <div className="how-to-use2">
              <Space height="3.6rem" />
              <div className="flex">
                <Heading>마인더</Heading>
                <Space width="0.65rem" />
                <Body4 color={Green}>Minder, 상담을 해주는 사람</Body4>
              </div>
              <Space height="2.85rem" />
              <ProcedureImg2 src={Procedure2} />
            </div>

            <FinalBox>
              <Body3>지금 바로 셰어마인드에서 활동해 볼까요?</Body3>
              <Button
                text="셰어마인드 홈"
                width="calc(100% - 4rem)"
                height="5.2rem"
                onClick={() => {
                  navigate('/share');
                }}
              />
            </FinalBox>
          </main>

          <Footer>
            <div className="item">
              <Heart />
              <Caption2 color={Grey2}>
                셰어마인드는 전문 상담사가 활동하는 플랫폼이 아닙니다.
              </Caption2>
            </div>
            <div className="item">
              <Heart />
              <Caption2 color={Grey2}>
                의료 또는 전문적인 도움이 필요하신 경우 <br />
                심리상담사 및 의사의 도움을 받으시기 바랍니다.
              </Caption2>
            </div>
          </Footer>
        </>
      )}
    </ServicePageContainer>
  );
}

const ServicePageContainer = styled.div`
  .service-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 33.1rem;
    background-color: ${LightGreen};
  }
  .main-caption {
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
  .left-caption {
    margin-left: 2.8rem;
  }
  .right-caption {
    display: flex;
    justify-content: flex-end;
  }
  .right-caption2 {
    display: flex;
    justify-content: center;
  }
  .slide-category {
    background-color: ${Grey6};
    height: 21.7rem;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .service-point {
    padding: 2rem;
  }

  .main-gray {
    width: 100%;
    text-align: center;
    background-color: ${Grey6};
  }
  .how-to-use {
    padding: 2rem;
    box-sizing: border-box;
    height: 83.1rem;
    background-color: ${LightGreen};
  }
  .how-to-use2 {
    padding: 2rem;
    box-sizing: border-box;
    height: 69.6rem;
    background-color: ${LightGreen};
  }
  .flex {
    display: flex;
    align-items: center;
  }

  .char {
    width: 10rem;
  }
`;

const SharemindLogoIcon = styled.img`
  display: block;
  width: 50%;
`;

const LeftFigure = styled.img`
  width: calc(100% - 2rem);
  height: auto;
`;
const RightFigure = styled.img`
  width: calc(100% - 2rem);
  height: auto;
  align-self: flex-end;
`;

const MainFigure = styled.img`
  width: 100%;
`;

const HightLightText = styled.div`
  color: var(--Signature-Green, #12c0b5);
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 2.4rem */
`;

const ProcedureImg1 = styled.img`
  width: 25.8rem;
`;
const ProcedureImg2 = styled.img`
  width: 31rem;
`;

const loopAnimation = keyframes`
  from{
    transform: translateX(0);
  }
  to{
    transform: translateX(-50%);
  }
`;

const SlideList = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  animation-name: ${loopAnimation};
  animation-duration: 20s;
  animation-direction: reverse;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const SlideReverseList = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  animation-name: ${loopAnimation};
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const SliderItem = styled.div`
  width: 23rem;
  height: 8rem;
  margin: 1rem;
  background-color: white;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  .char {
    height: 100%;
  }
`;

const FinalBox = styled.div`
  display: flex;
  background-color: white;
  height: 13.8rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`;

const Heart = styled(HeartIcon)`
  width: 2rem;
`;

const Footer = styled.footer`
  height: 14.5rem;
  background: ${Grey6};
  padding: 1.8rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  .item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export default Service;
