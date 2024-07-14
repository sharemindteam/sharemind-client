import { SavedCounselorResults } from 'components/Buyer/BuyerSavedCounselor.tsx/SavedCounselorResults';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Space } from 'components/Common/Space';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';

import Divider2 from 'components/Common/Divider2';

import SavedOpenConsultResults from 'components/Buyer/BuyerSavedCounselor.tsx/SavedOpenConsultResults';

//
//
//

export const BuyerSavedCounselor = () => {
  const navigate = useNavigate();

  const [tabState, setTabState] = useState<number>(1);

  //
  //
  //

  if (tabState === 1) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/mypage');
            }}
          />
          <Heading color={Grey1}>찜 목록</Heading>
        </HeaderWrapper>
        <Divider2 tabState={tabState} setTabState={setTabState} />
        <Space height="1.2rem" />
        <SavedCounselorResults />
      </>
    );
  } else if (tabState === 2) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/mypage');
            }}
          />
          <Heading color={Grey1}>찜 목록</Heading>
        </HeaderWrapper>
        <Divider2 tabState={tabState} setTabState={setTabState} />
        <Space height="1.2rem" />
        <SavedOpenConsultResults />
      </>
    );
  }
};
