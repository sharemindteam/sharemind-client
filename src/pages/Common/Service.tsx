import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from 'styles/font';

function Service() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/seller/');
          }}
        />
        <Heading>서비스 소개</Heading>
      </HeaderWrapper>
    </>
  );
}

export default Service;
