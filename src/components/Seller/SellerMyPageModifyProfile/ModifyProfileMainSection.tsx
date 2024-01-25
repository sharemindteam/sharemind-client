import Input from 'components/Common/Input';
import styled from 'styled-components';
import {
  ErrorColor,
  Grey1,
  Grey3,
  Grey4,
  Grey5,
  Grey6,
  LightGreen,
  SafeColor,
  White,
} from 'styles/color';
import { Body1, Caption2 } from 'styles/font';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check.svg';
import { SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isUpdateModalOpenState,
  isCategoryModalOpenState,
  isStyleModalOpenState,
  isTypeOpenModalState,
  isBankModalOpenState,
} from 'utils/atom';
import { categoryInputMaker } from 'utils/categoryInputmaker';
import { BottomButton } from '../Common/BottomButton';
import { Space } from 'components/Common/Space';
import { UpdatePopup } from './UpdatePopup';
import { SelectedTimeList } from './SetChatTimeSection';
import { convertTimeRange } from 'utils/convertTimeToString';

interface ModifyProfileMainSectionProps {
  selectCategory: number[];
  selectStyle: string;
  selectType: string[];
  selectAvailableTime: SelectedTimeList;
  setIsSetChatTime: React.Dispatch<SetStateAction<boolean>>;
  nickname: any;
  category: any;
  style: any;
  type: any;
  availableTime: any;
  letterPrice: any;
  chatPrice: any;
  oneLiner: any;
  experience: any;
  isNoProfile: boolean;
}
const dayEngtoKor: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};
const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function convertObjectToString(schedule: any) {
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  let result = '';

  // 각 요일에 대해 반복
  daysOfWeek.forEach((day) => {
    const timeRanges = schedule[day];

    if (timeRanges && timeRanges.length > 0) {
      // 각 시간 범위를 형식에 맞게 조합
      const formattedTimeRanges = timeRanges.map((range: any) =>
        convertTimeRange2(range),
      );
      const daySchedule = `${dayEngtoKor[day]} ${formattedTimeRanges.join(
        ', ',
      )}\n`;
      result += daySchedule;
    }
  });
  return result.trim();
}

function convertTimeRange2(input: string) {
  const numbers = input.match(/\d+/g);

  if (numbers && numbers.length === 2) {
    const startTime = numbers[0].padStart(2, '0') + ':00';
    const endTime = numbers[1].padStart(2, '0') + ':00';

    return `${startTime}-${endTime} `;
  } else {
    return input; // 유효하지 않은 형식은 그대로 반환
  }
}

export const ModifyProfileMainSection = ({
  selectCategory,
  selectStyle,
  selectType,
  setIsSetChatTime,
  nickname,
  category,
  style,
  type,
  availableTime,
  letterPrice,
  chatPrice,
  oneLiner,
  experience,
  isNoProfile,
  selectAvailableTime,
}: ModifyProfileMainSectionProps) => {
  const navigate = useNavigate();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useRecoilState(
    isCategoryModalOpenState,
  );
  const [isStyleModalOpen, setIsStyleModalOpen] = useRecoilState(
    isStyleModalOpenState,
  );
  const [isTypeModalOpen, setIsTypeModalOpen] =
    useRecoilState(isTypeOpenModalState);
  const setIsBankModalOpen = useSetRecoilState(isBankModalOpenState);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useRecoilState<boolean>(
    isUpdateModalOpenState,
  );
  useEffect(() => {
    try {
      category?.setViewValue(categoryInputMaker(selectCategory ?? ['']));
    } catch (err) {
      alert('판매 정보를 제대로 가져오지 못했어요.');
      navigate('/seller/mypage');
    }
  }, [selectCategory]);

  useEffect(() => {
    try {
      style?.setViewValue(selectStyle);
    } catch (err) {
      alert('판매 정보를 제대로 가져오지 못했어요.');
      navigate('/seller/mypage');
    }
  }, [selectStyle]);

  useEffect(() => {
    type?.setViewValue(selectType?.join(', '));
  }, [selectType]);
  console.log(selectAvailableTime);
  return (
    <ModifyProfileMainSectionWrapper>
      {isUpdateModalOpen && (
        <UpdatePopup
          nickname={nickname}
          category={category}
          style={style}
          type={type}
          availableTime={availableTime}
          letterPrice={letterPrice}
          chatPrice={chatPrice}
          oneLiner={oneLiner}
          experience={experience}
          selectAvailableTime={selectAvailableTime}
        />
      )}
      <ModifyProfileBox>
        <div className="nickname">
          <ProfileInformTag>닉네임</ProfileInformTag>
          <Input
            width="100%"
            height="4.8rem"
            isError={nickname.isError}
            placeholder="닉네임을 입력해주세요"
            value={nickname.value}
            onChange={(e) => {
              nickname.handleCheckSpecialLetter(e.target.value);
              nickname.onChange(e);
            }}
            padding="1.2rem 1.6rem"
            isBoxSizing={true}
            maxLength={10}
          />
          <ConditionMessage>
            <Caption2
              color={
                nickname.isError
                  ? ErrorColor
                  : nickname.isValid
                  ? SafeColor
                  : Grey4
              }
            >
              1-10자 / 한글, 영문, 숫자 가능 (특수문자 불가)
            </Caption2>
            {nickname.isError ? (
              ''
            ) : nickname.isValid ? (
              <CheckIcon stroke={SafeColor} />
            ) : (
              <CheckIcon stroke={Grey5} />
            )}
          </ConditionMessage>
        </div>
        <div className="category">
          <ProfileInformTag>상담 카테고리</ProfileInformTag>
          <div
            onClick={() => {
              setIsCategoryModalOpen(true);
            }}
          >
            <Input
              width="100%"
              height="4.8rem"
              value={category.viewValue}
              readOnly={true}
              placeholder="상담 카테고리를 선택해주세요"
              isCursorPointer={true}
              padding="1.2rem 1.6rem"
              isBoxSizing={true}
              backgroundColor={isCategoryModalOpen ? LightGreen : Grey6}
            />
          </div>
        </div>
        <div className="style">
          <ProfileInformTag>상담 스타일</ProfileInformTag>
          <div
            onClick={() => {
              setIsStyleModalOpen(true);
            }}
          >
            <Input
              width="100%"
              placeholder="상담 스타일을 선택해주세요"
              height="4.8rem"
              value={style.viewValue}
              readOnly={true}
              isCursorPointer={true}
              padding="1.2rem 1.6rem"
              isBoxSizing={true}
              backgroundColor={isStyleModalOpen ? LightGreen : Grey6}
            />
          </div>
        </div>
      </ModifyProfileBox>
      <ModifyProfileBox>
        <div className="type">
          <ProfileInformTag>상담 방식</ProfileInformTag>
          <div
            onClick={() => {
              setIsTypeModalOpen(true);
            }}
          >
            <Input
              width="100%"
              height="4.8rem"
              placeholder="상담 방식을 선택해주세요"
              value={type.viewValue}
              readOnly={true}
              isCursorPointer={true}
              padding="1.2rem 1.6rem"
              isBoxSizing={true}
              backgroundColor={isTypeModalOpen ? LightGreen : Grey6}
            />
          </div>
        </div>
        <div className="available-time">
          <ProfileInformTag>상담 가능시간</ProfileInformTag>
          <Input
            width="100%"
            height="4.8rem"
            value={convertObjectToString(selectAvailableTime)}
            readOnly={true}
            padding="1.2rem 1.6rem"
            isBoxSizing={true}
            isCursorPointer={true}
            onClick={() => {
              setIsSetChatTime(true);
            }}
          />
        </div>
        <div className="price">
          <ProfileInformTag>상담 가격</ProfileInformTag>
          <div className="letter-price">
            <PriceInformTag>편지</PriceInformTag>
            <PriceInput
              value={letterPrice.value}
              onChange={letterPrice.onChangePrice}
              placeholder="1건 당 5,000~50,000"
              maxLength={6}
            />

            <Body1>원</Body1>
          </div>
          <div className="chat-price">
            <PriceInformTag>채팅</PriceInformTag>
            <PriceInput
              value={chatPrice?.value}
              onChange={chatPrice.onChangePrice}
              placeholder="1건 당 5,000~50,000"
              maxLength={6}
            />
            <Body1>원</Body1>
          </div>
        </div>
      </ModifyProfileBox>
      <ModifyProfileBox>
        <div className="one-liner">
          <ProfileInformTag>한줄 소개</ProfileInformTag>
          <Input
            width="100%"
            height="4.8rem"
            maxLength={50}
            value={oneLiner.value}
            placeholder="내 경험을 한 줄로 요약해주세요"
            onChange={(e) => {
              oneLiner.handleCheckOneLiner(e.target.value);
              oneLiner.onChange(e);
            }}
            padding="1.2rem 1.6rem"
            isBoxSizing={true}
          />
          <ConditionMessage>
            <Caption2
              color={
                oneLiner.isError
                  ? ErrorColor
                  : oneLiner.isValid
                  ? SafeColor
                  : Grey4
              }
            >
              최대 50자 / 한글, 영문, 숫자 가능 (특수문자 불가)
            </Caption2>
            {oneLiner.isError ? (
              ''
            ) : oneLiner.isValid ? (
              <CheckIcon stroke={SafeColor} />
            ) : (
              <CheckIcon stroke={Grey5} />
            )}
          </ConditionMessage>
        </div>
        <div className="experience">
          <ProfileInformTag>경험 소개</ProfileInformTag>
          <ExperienceTextArea
            maxLength={20000}
            placeholder="내 경험을 셰어에게 소개해주세요"
            value={experience.value}
            onChange={(e) => {
              experience.handleCheckExperience(e.target.value);
              experience.onChange(e);
            }}
          />
          <ConditionMessage>
            <Caption2
              color={
                experience.isError
                  ? ErrorColor
                  : experience.isValid
                  ? SafeColor
                  : Grey4
              }
            >
              최대 20,000자 / 한글, 영문, 숫자 가능 (특수문자 불가)
            </Caption2>
            {experience.isError ? (
              ''
            ) : experience.isValid ? (
              <CheckIcon stroke={SafeColor} />
            ) : (
              <CheckIcon stroke={Grey5} />
            )}

            <CheckIcon />
          </ConditionMessage>
        </div>
        {/* <div className="account">
          <ProfileInformTag>수익 계좌</ProfileInformTag>
          <div className="account-num">
            <AccountTag>계좌번호</AccountTag>
            <Input
              width="100%"
              height="4.8rem"
              maxLength={50}
              value={accountNum.value}
              onChange={(e) => {
                accountNum.handleCheckSpecialLetter(e.target.value);
                accountNum.onChange(e);
              }}
              padding="1.2rem 1.6rem"
              isBoxSizing={true}
            />
          </div>
          <div className="bank-type">
            <AccountTag>은행</AccountTag>
            <BankTypeSelect
              onClick={() => {
                setIsBankModalOpen(true);
              }}
            >
              <BankIcon bankType={bankType.value} />
              <Body1>{bankType.value}</Body1>
            </BankTypeSelect>
          </div>
          <div className="bank-owner">
            <AccountTag>예금주</AccountTag>
            <Input
              width="100%"
              height="4.8rem"
              maxLength={50}
              value={bankOwner.value}
              onChange={(e) => {
                bankOwner.handleCheckSpecialLetter(e.target.value);
                bankOwner.onChange(e);
              }}
              padding="1.2rem 1.6rem"
              isBoxSizing={true}
            />
          </div>
        </div> */}
        <Space height="9.2rem" />
      </ModifyProfileBox>
      <BottomButton
        // 폼 입력이 있으면서 에러가 없어야 저장하기 버튼 활성화
        isActive={
          !(
            nickname.isError ||
            !category.serverValue ||
            !style.serverValue ||
            !type.serverValue ||
            letterPrice.isError ||
            chatPrice.isError ||
            oneLiner.isError ||
            experience.isError ||
            // 한 줄 소개, 경험 소개 길이가 0일 경우
            experience.value.length === 0 ||
            oneLiner.value.length === 0
          )
        }
        text={isNoProfile ? '작성 완료하기' : '저장하기'}
        onClick={() => {
          setIsUpdateModalOpen(true);
          // navigate('/seller/mypage/modifyProfile');
        }}
      />
    </ModifyProfileMainSectionWrapper>
  );
};

const ModifyProfileMainSectionWrapper = styled.section`
  display: flex;
  margin-top: 0.2rem;
  flex-direction: column;
  gap: 1.1rem;
`;

const ModifyProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 2rem;
  gap: 2.4rem;
  background-color: ${White};
  .letter-price {
    margin: 0.6rem 0;
    display: flex;
    align-items: center;
  }
  .chat-price {
    display: flex;
    align-items: center;
  }
  .account {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .account > div {
    display: flex;
    align-items: center;
  }
`;

const ProfileInformTag = styled(Body1)`
  color: ${Grey3};
  margin-bottom: 0.6rem;
`;

const ConditionMessage = styled.div`
  margin-top: 0.4rem;
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

const PriceInformTag = styled(Body1)`
  margin-right: auto;
`;

const PriceInput = styled.input`
  width: calc(100% - 7rem);
  height: 4.8rem;
  padding: 1.2rem 1.6rem;
  box-sizing: border-box;
  text-align: right;
  border-radius: 1.2rem;
  background: ${Grey6};
  margin-right: 1rem;
  overflow: hidden;
  color: ${Grey1};
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  &::placeholder {
    font-size: 1.6rem;
    font-weight: 400;
    color: ${Grey3};
  }
`;

const ExperienceTextArea = styled.textarea`
  height: 44rem;
  border: none;
  resize: none;
  background-color: ${Grey6};
  box-sizing: border-box;
  padding: 1.6rem;
  width: 100%;
  color: ${Grey1};
  border-radius: 1.2rem;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 150%;
  &::placeholder {
    color: var(--Greyscale-Grey-3, #95959b);
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 2.4rem */
  }
  &:focus {
    outline: none;
  }
`;

const AccountTag = styled.div`
  width: 8rem;
  margin-right: 1.7rem;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 2.4rem */
`;

const BankTypeSelect = styled.div`
  border-radius: 1.2rem;
  background: ${Grey6};
  height: 4.8rem;
  padding: 1.2rem 1.6rem;
  display: flex;
  gap: 0.8rem;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
`;

const OneLinerInput = styled.div`
  width: 100%;
  height; 4.8rem;
  background-color: ${Grey6};
  padding: 1.2rem 1.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  `;
