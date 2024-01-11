import React from 'react';
import { Heading } from 'styles/font';
import { ReactComponent as VerifyMaterial } from 'assets/icons/graphic-verify-material-1.svg';
import styled from 'styled-components';
import { Space } from 'components/Common/Space';
import { Grey1 } from 'styles/color';
import VerifyMaterialButton from './VerifyMaterialButton';
function FirstMaterial() {
  return (
    <>
      <Heading>셰어와 마인더</Heading>
      <Space height="5rem" />
      <VerifyMaterialGraphic1 />
      <Space height="5.52rem" />
      <Caption>
        셰어마인드는 상담을 받는 <b>셰어</b>, 상담을 해주는 <b>마인더</b>로
        역할이 나누어져 있습니다. 셰어는 <b>고민을 털어놓고 나누는</b> 사람,
        마인더는 그러한 셰어의 <b>마음을 돌보고 지켜주는</b> 사람이라는 의미를
        담고 있습니다.
      </Caption>
      <Space height="2.8rem" />
      <Caption>
        셰어는 <b>마인더가 남겨주신 경험 소개</b>를 읽고 마인더에게{' '}
        <b>상담을 요청</b>하게 됩니다. 마인더의 경험을 바탕으로 고민하고 있는
        셰어의 마음을 지켜주세요.
      </Caption>
      <VerifyMaterialButton level={1} />
    </>
  );
}
const VerifyMaterialGraphic1 = styled(VerifyMaterial)`
  display: block;
  margin: 0 auto;
  width: 100%;
`;

const Caption = styled.div`
  color: ${Grey1};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 2.4rem */
`;

export default FirstMaterial;
