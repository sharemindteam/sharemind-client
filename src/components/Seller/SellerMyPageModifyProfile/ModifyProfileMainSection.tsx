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
  Red,
  SafeColor,
  White,
} from 'styles/color';
import { Body1, Caption2 } from 'styles/font';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check.svg';
import { useInput } from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { isIncludeSpecialLetter } from 'utils/isIncludeSpecialLetter';
import { profileDummyData } from 'utils/profileDummy';
import { useCustomSelect } from 'hooks/useCustomSelect';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isUpdateModalOpenState,
  isCategoryModalOpenState,
  isStyleModalOpenState,
  isTypeOpenModalState,
  isSuccessUpdateState,
  isBankModalOpenState,
} from 'utils/atom';
import { categoryInputMaker } from 'utils/categoryInputmaker';
import { BottomButton } from '../Common/BottomButton';
import { Space } from 'components/Common/Space';
import { BankIcon } from 'utils/BankIcon';

interface ModifyProfileMainSectionProps {
  selectCategory: number[];
  selectStyle: string;
  selectType: string[];
  selectBankType: string;
}
export const ModifyProfileMainSection = ({
  selectCategory,
  selectStyle,
  selectType,
  selectBankType,
}: ModifyProfileMainSectionProps) => {
  const navigate = useNavigate();
  const nickname = useInput('');

  const category = useCustomSelect();
  const style = useCustomSelect();
  const type = useCustomSelect();

  // 시간 설정은 나중에....ㅠㅠ
  const availableTime = useCustomSelect();

  const letterPrice = useInput('');
  const chatPrice = useInput('');

  const oneLiner = useInput('');
  const experience = useInput('');
  const accountNum = useInput('');
  const bankType = useInput('');
  const bankOwner = useInput('');

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useRecoilState(
    isCategoryModalOpenState,
  );
  const [isStyleModalOpen, setIsStyleModalOpen] = useRecoilState(
    isStyleModalOpenState,
  );
  const [isTypeModalOpen, setIsTypeModalOpen] =
    useRecoilState(isTypeOpenModalState);
  const setIsBankModalOpen = useSetRecoilState(isBankModalOpenState);
  const setIsUpdateModalOpen = useSetRecoilState(isUpdateModalOpenState);

  useEffect(() => {
    category.setViewValue(categoryInputMaker(selectCategory));
  }, [selectCategory]);

  useEffect(() => {
    style.setViewValue(selectStyle);
  }, [selectStyle]);

  useEffect(() => {
    type.setViewValue(selectType.join(', '));
  }, [selectType]);
  useEffect(() => {
    bankType.setValue(selectBankType);
  }, [selectBankType]);
  useEffect(() => {
    nickname.setValue(profileDummyData.nickName);
    category.setViewValue(profileDummyData.category);
    style.setViewValue(profileDummyData.style);
    type.setViewValue(profileDummyData.type);
    availableTime.setViewValue(profileDummyData.time);
    letterPrice.setValue(
      profileDummyData.letterPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    );
    chatPrice.setValue(
      profileDummyData.chatPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    );
    oneLiner.setValue(profileDummyData.oneLiner);
    experience.setValue(profileDummyData.experience);
    accountNum.setValue(profileDummyData.accountNum);
    bankType.setValue(profileDummyData.bankType);
    bankOwner.setValue(profileDummyData.bankOwner);
  }, []);
  return (
    <ModifyProfileMainSectionWrapper>
      <ModifyProfileBox>
        <div className="nickname">
          <ProfileInformTag>닉네임</ProfileInformTag>
          <Input
            width="100%"
            height="4.8rem"
            isError={nickname.isError}
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
            value={availableTime.viewValue.slice(0, 26) + '...'}
            readOnly={true}
            padding="1.2rem 1.6rem"
            isBoxSizing={true}
          />
        </div>
        <div className="price">
          <ProfileInformTag>상담 가격</ProfileInformTag>
          <div className="letter-price">
            <PriceInformTag>편지</PriceInformTag>
            <PriceInput
              value={letterPrice.value}
              onChange={letterPrice.onChangePrice}
              placeholder="1회당 최소 5,000원~최대 50,000원"
              maxLength={6}
            />

            <Body1>원</Body1>
          </div>
          <div className="chat-price">
            <PriceInformTag>채팅</PriceInformTag>
            <PriceInput
              value={chatPrice.value}
              onChange={chatPrice.onChangePrice}
              placeholder="30분당 최소 5,000원~최대 50,000원"
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
        <div className="account">
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
        </div>
        <Space height="9.2rem" />
      </ModifyProfileBox>
      <BottomButton
        text="저장하기"
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
    font-size: 1.2rem;
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
