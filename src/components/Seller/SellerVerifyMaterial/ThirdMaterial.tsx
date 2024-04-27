import { Heading } from 'styles/font';
import styled from 'styled-components';
import { Space } from 'components/Common/Space';
import { Grey1 } from 'styles/color';

import { ReactComponent as VerifyMaterial } from 'assets/icons/graphic-verify-material-3.svg';
import VerifyMaterialButton from './VerifyMaterialButton';

//
//
//

function ThirdMaterial() {
  return (
    <>
      <Heading>상담 진행 팁</Heading>
      <Space height="5rem" />
      <VerifyMaterialGraphic3 />
      <Space height="4.75rem" />
      <Caption>
        셰어가 호소하고 있는 문제, 배경 정보와 연애 상담의 대상이 되는 상대의
        정보, 셰어의 태도와 대처 등을 파악해 주세요. 셰어가{' '}
        <b>쉽게 말할 수 있도록 편안한 분위기를 조성</b>해 주세요.
      </Caption>
      <Space height="2.8rem" />
      <Caption>
        셰어의 이야기가 <b>길어질 때는 </b>마인더님께서 <b>내용을 요약 정리</b>
        해주면서 대화를 이어나가시면 좋아요.
      </Caption>
      <Space height="2.8rem" />
      <Caption>
        상담 중 <b>셰어의 불안이 고조</b>될 경우 <b>잠시 화제를 돌려</b>도
        좋습니다. 정상적으로 상담을 진행하기 어려울 경우 판매자 측에서 상담을
        취소할 수 있습니다.
      </Caption>
      <VerifyMaterialButton level={3} />
    </>
  );
}

const VerifyMaterialGraphic3 = styled(VerifyMaterial)`
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

export default ThirdMaterial;
