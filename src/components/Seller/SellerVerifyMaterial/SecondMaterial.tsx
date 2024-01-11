import React from 'react';
import { Body3, Heading } from 'styles/font';
import styled from 'styled-components';
import { Space } from 'components/Common/Space';
import { Green, Grey1, Grey4 } from 'styles/color';
import { Button } from 'components/Common/Button';
import { ReactComponent as VerifyMaterial } from 'assets/icons/graphic-verify-material-2.svg';
import VerifyMaterialButton from './VerifyMaterialButton';
function SecondMaterial() {
  return (
    <>
      <Heading>셰어마인드 첫 상담 진행하기</Heading>
      <Space height="5rem" />
      <VerifyMaterialGraphic2 />
      <Space height="4.75rem" />
      <Caption>
        간단한 인사 후, <b>상담은 질문으로 시작해 주세요.</b> 마인더님의 경험을
        이야기하며 유대감을 형성하는 것도 중요하지만 먼저{' '}
        <b>셰어의 이야기를 들어주세요.</b>
      </Caption>
      <Space height="2.8rem" />
      <Caption>
        상담 시간을 엄수해야 합니다. <b>지정한 상담 시간</b>에는{' '}
        <b>가급적 접속</b>해 주시고, 시간 초과로 인한 취소가 발생하지 않도록
        주의해 주세요.
        <b> 24시간 이내 무응답</b>
        으로 인한 취소 건이 <b>누적될 경우 페널티</b>가 발생할 수 있어요.
      </Caption>
      <Space height="2.8rem" />
      <Caption>
        상담 중 민감한 개인정보와 관련된 이야기가 나올 수 있어요. 개인정보
        유출을 절대 삼가주세요. 마인더의 개인정보 유출과 관련하여 셰어마인드는
        절대 책임을 지지 않으며 필요 시 수사기관과 적극 협조할 예정입니다.
      </Caption>
      <VerifyMaterialButton level={2} />
    </>
  );
}

const VerifyMaterialGraphic2 = styled(VerifyMaterial)`
  display: block;
  margin: 0 auto;
  width: 20.0155rem;
`;

const Caption = styled.div`
  color: ${Grey1};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 2.4rem */
`;
export default SecondMaterial;
