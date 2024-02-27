import styled from 'styled-components';
import {
  Green,
  Grey1,
  Grey2,
  Grey4,
  Grey5,
  Grey6,
  LightGreen,
  LightRed,
  Red,
  White,
} from 'styles/color';
import { Body1, Body3, Caption2 } from 'styles/font';
import { AppendCategoryTypeUndefined } from 'utils/AppendCategoryType';
import { Characters } from 'utils/Characters';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { ChatCounselorInfo } from 'utils/type';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
interface ChatCounselorInfoBoxProps {
  info: ChatCounselorInfo;
}
export const ChatCounselorInfoBox = ({ info }: ChatCounselorInfoBoxProps) => {
  const tagList = AppendCategoryTypeUndefined(
    info.consultCategories,
    info.consultStyle,
  );
  return (
    <CounselorInfoBox>
      <div className="box-top-container">
        <div className="tag-container">
          {tagList.map((value, index) => {
            if (index === tagList.length - 1) {
              return (
                <CategoryTag $isStyle={true}>
                  <Caption2 color={Red}>{value}</Caption2>
                </CategoryTag>
              );
            } else {
              return (
                <CategoryTag $isStyle={false}>
                  <Caption2 color={Green}>{value}</Caption2>
                </CategoryTag>
              );
            }
          })}
        </div>
        <Body1 color={Grey1}>{info.introduction}</Body1>
      </div>
      <Divider $color={Grey6} />
      <div className="box-middle-container">
        <Characters
          number={consultStyleToCharNum(info.consultStyle)}
          width="5.5rem"
          height="4.7rem"
        />
        <div>
          <div className="box-middle-row1">
            <Body1 color={Grey1}>{info.nickname}</Body1>
            <Caption2 color={Grey1}>LV. {info.level}</Caption2>
          </div>
          <div className="box-middle-row2">
            <HeartIcon />
            <Body3
              color={Grey2}
            >{`${info.ratingAverage} (${info.totalReview})`}</Body3>
          </div>
        </div>
      </div>
      <Divider $color={Grey5} />
      <div className="box-bottom-container">
        <Body3 color={Grey1}>
          {info.nickname}님께 고민 내용을 남겨주세요. 연애상담마스터님이
          준비되면 시작 요청을 보내드립니다.
        </Body3>
        <Body3 color={Grey4}>
          *24시간 이내 시작 요청을 받지 못하실 경우 자동으로 환불 처리가
          진행됩니다.
        </Body3>
      </div>
    </CounselorInfoBox>
  );
};

const CounselorInfoBox = styled.div`
  background-color: ${White};
  width: 89.33%;
  margin-top: 1.8rem;
  margin-bottom: 0.4rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .box-top-container {
    padding: 1.6rem 1.6rem 1.2rem 1.6rem;
  }
  .box-middle-container {
    padding: 1.2rem 1.6rem 1.2rem 1.6rem;
    display: flex;
    gap: 1.2rem;
  }
  .box-bottom-container {
    padding: 1.2rem 1.6rem 1.6rem 1.6rem;
  }

  .box-middle-row1 {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  .box-middle-row2 {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }
  .tag-container {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;
const CategoryTag = styled.div<{ $isStyle: boolean }>`
  display: flex;
  padding: 0.4rem 0.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  background-color: ${(props) => (props.$isStyle ? LightRed : LightGreen)};
`;

const Divider = styled.div<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: 100%;
  height: 0.1rem;
`;
