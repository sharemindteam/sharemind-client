import styled from 'styled-components';
import { ReactComponent as NoCalculationGraphicIcon } from 'assets/icons/graphic-noting.svg';

//
//
//
interface NoCalculationGraphicProps {
  status: string;
}

//
//
//

export const NoCalculationGraphic = ({ status }: NoCalculationGraphicProps) => {
  return (
    <NoCalculationGraphicWrapper>
      <NoCalculationGraphicIcon />
      <MainText>
        {status === '완료'
          ? '아직 정산 완료 내역이 없어요.'
          : status === '정산 중'
          ? '정산 중인 내역이 없어요.'
          : '아직 완료된 상담이 없어요.'}
      </MainText>
    </NoCalculationGraphicWrapper>
  );
};

const NoCalculationGraphicWrapper = styled.div`
  display: flex;
  margin-top: 15.3rem;
  align-items: center;
  flex-direction: column;
`;

const MainText = styled.div`
  color: #000;
  margin-top: 4.61rem;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-weight: 600;
  line-height: 3rem;
`;
