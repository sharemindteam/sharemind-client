import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as NoCalculationGraphicIcon } from 'assets/icons/graphic-no-calculation.svg';
interface NoCalculationGraphicProps {
  status: string;
}

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
      <SubText>
        {status === '완료' ? (
          <>
            수익은 정산 신청일로부터 <br /> 15영업일 이후에 지급되어요.
          </>
        ) : status === '정산 중' ? (
          <>
            아직 정산 신청을 하지 않은 상담이 있다면 <br /> <b>정산 예정</b>{' '}
            탭에서 신청할 수 있어요.
          </>
        ) : (
          <>
            상담 종료 신청을 보내면 셰어의 확인 없이도 <br />
            n일 이내 자동으로 상담이 종료되어요.
          </>
        )}
      </SubText>
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
const SubText = styled.div`
  margin-top: 1.2rem;
  color: var(--greyscale-grey-1-text, #33333a);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 2.4rem */
`;
