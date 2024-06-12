import React from 'react';
import styled from 'styled-components';
import { ReactComponent as NotWrite } from 'assets/icons/graphic-noting.svg';
//
//
//
function NoConsultSection() {
  return (
    <NoConsultSectionWrapper>
      <NoConsultGraphic />
      <NoConsultMessage>새로 올라온 공개상담 글이 없어요</NoConsultMessage>
      <AlertMessage>
        현재 올라온 공개상담에 답변이 모두 채택되었어요! <br />
        새로운 글이 올라올 때까지 조금만 기다려주세요.
      </AlertMessage>
    </NoConsultSectionWrapper>
  );
}

//
//
//
const NoConsultSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: calc(100vh - 5.3rem);
  gap: 4rem;
`;
const AlertMessage = styled.div`
  font-family: Pretendard;
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const NoConsultGraphic = styled(NotWrite)`
  margin-top: 16.4rem;
`;
const NoConsultMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem;
  margin-bottom: -3rem;
`;
export default NoConsultSection;
