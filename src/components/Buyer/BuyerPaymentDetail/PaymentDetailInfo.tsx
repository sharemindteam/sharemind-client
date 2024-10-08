import styled from 'styled-components';
import { Grey1, Grey3, White } from 'styles/color';
import { Body3, Body5, Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/open-consult/open-consult-heart.svg';
import { Flex } from 'components/Common/Flex';

//
//
//

interface PaymentDetailInfoProps {
  nickname: string;
  level: number;
  rating: number;
  reviewNumber: number;
  totalConsult: number;
  consultStyle: number | undefined;
}

//
//
//

export const PaymentDetailInfo = ({
  nickname,
  level,
  rating,
  reviewNumber,
  totalConsult,
  consultStyle,
}: PaymentDetailInfoProps) => {
  return (
    <Wrapper>
      <div className="card-headline">
        <Body5 color={Grey3} padding="0.2rem 0">
          상품 정보
        </Body5>
      </div>
      <CardWrapper>
        <div className="col1">
          <div className="row1">
            <Heading>{nickname}</Heading>
            <Body3>Lv {level}</Body3>
          </div>
          <div className="row2">
            <Body3 color={Grey1}>{'상담 ' + totalConsult + '회'}</Body3>
            <Divider />
            <Body3 color={Grey1}>{'후기 ' + reviewNumber + '개'}</Body3>
            <Divider />
            <Flex gap="0.2rem">
              <HeartIcon />
              <Body3 color={Grey1} padding="0.04rem 0 0 0">
                {rating}
              </Body3>
            </Flex>
          </div>
        </div>
        <div className="col2">
          <Characters number={consultStyle} width="7.6rem" height="7rem" />
        </div>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${White};
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.6rem 2.4rem;
  margin: 0.4rem 0 0.8rem 0;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  .col1 {
    display: flex;
    flex-direction: column;
  }

  .row1 {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.05rem;
  }

  .row2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .row3 {
    display: flex;
    gap: 0.8rem;
  }
`;

const Divider = styled.div`
  width: 0.1rem;
  height: 1.5rem;
  background-color: ${Grey3};
`;
