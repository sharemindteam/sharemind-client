import React from 'react';
import { Heading } from 'styles/font';
import { ReactComponent as VerifyMaterial } from 'assets/icons/graphic-verify-material-4.svg';
import styled from 'styled-components';
import { Space } from 'components/Common/Space';
import { Grey1 } from 'styles/color';
import VerifyMaterialButton from './VerifyMaterialButton';
import { useRecoilState } from 'recoil';
import { isTakingQuizModalOpenState } from 'utils/atom';
import { BackDrop } from 'components/Common/BackDrop';

function FinalMaterial() {
  return (
    <>
      {' '}
      <Heading>이중 관계의 금지</Heading>
      <Space height="5rem" />
      <VerifyMaterialGraphic4 />
      <Space height="5.52rem" />
      <Caption>
        셰어마인드 내 상담 범위를 벗어나는 <b>친밀 관계, 상품 거래</b> 등은 제재
        사유가 될 수 있어요.
      </Caption>
      <Space height="2.8rem" />
      <Caption>
        <b>타 플랫폼으로 유도, 연락처 공유</b> 등도 마찬가지로{' '}
        <b>제재 사유가</b> 될 수 있으니 주의해 주세요.
      </Caption>
      <VerifyMaterialButton level={4} />
      
    </>
  );
}
const VerifyMaterialGraphic4 = styled(VerifyMaterial)`
  display: block;
  margin: 0 auto;
  width: 100%;
`;

const Caption = styled.div`
  color: ${Grey1};
  font-family: Pretendard;
  word-break: keep-all;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 2.4rem */
`;
export default FinalMaterial;
