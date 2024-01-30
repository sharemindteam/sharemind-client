import { Skeleton } from '@mui/material';
import { Space } from 'components/Common/Space';
import React from 'react';
import styled from 'styled-components';
import { Grey6 } from 'styles/color';

function ConsultCardSkeleton() {
  return (
    <ConsultCardSkeletonWrapper>
      <div className="flex-1">
        <Skeleton width={'4rem'} height={'2.5rem'} variant="rounded" />
        <Space height="0.6rem" />
        <div>
          <Skeleton variant="circular" width={'4rem'} height="4rem" />
        </div>
      </div>
      <div className="flex-2">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '2.5rem',
          }}
        >
          <div>
            <Skeleton width={'5rem'} height={'2rem'} />
          </div>
        </div>
        <div>
          <Skeleton width={'100%'} height={'4rem'} variant="rectangular" />
        </div>
      </div>
    </ConsultCardSkeletonWrapper>
  );
}

const ConsultCardSkeletonWrapper = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  height: 11.5rem;
  padding: 1.4rem 1.6rem 1.4rem 1.6rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  background-color: ${Grey6};
  gap: 3rem;
  .flex-1 {
    display: flex;
    width: 6rem;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  .flex-2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  }
`;

export default ConsultCardSkeleton;
