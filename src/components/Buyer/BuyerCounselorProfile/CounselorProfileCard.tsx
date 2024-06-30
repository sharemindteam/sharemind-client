import styled from 'styled-components';
import { Grey1, Grey6, White } from 'styles/color';
import { Body3, Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/open-consult/open-consult-heart.svg';
import { Flex } from 'components/Common/Flex';

//
//
//

interface CounselorProfileCardProps {
  nickname: string;
  level: number;
  rating: number;
  reviewNumber: number;
  consultStyle: number;
}

//
//
//

export const CounselorProfileCard = ({
  nickname,
  level,
  rating,
  reviewNumber,
  consultStyle,
}: CounselorProfileCardProps) => {
  return (
    <Wrapper>
      <CardWrapper>
        <div className="col1">
          <div className="row1">
            <Heading>{nickname}</Heading>
            <Body3 color={Grey1}>Lv {level}</Body3>
          </div>
          <div className="row2">
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(90deg, #12c0b5 0%, #e1f8f6 100%);
`;

const CardWrapper = styled.div`
  display: flex;
  width: 33.5rem;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2rem;
  border-bottom: 1px solid ${Grey6};
  .col1 {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .row1 {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  .row2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

const Divider = styled.div`
  width: 0.1rem;
  height: 1.5rem;
  background-color: ${White};
`;
