import Input from 'components/Common/Input';
import styled from 'styled-components';
import {
  ErrorColor,
  Grey1,
  Grey3,
  Grey4,
  Grey5,
  Grey6,
  SafeColor,
  White,
} from 'styles/color';
import { Body1, Caption2 } from 'styles/font';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check.svg';
import { useInput } from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { isIncludeSpecialLetter } from 'utils/isIncludeSpecialLetter';
import { profileDummyData } from 'utils/profileDummy';
export const ModifyProfileMainSection = () => {
  const nickname = useInput('');
  const letterPrice = useInput('');
  const chatPrice = useInput('');
  const oneLiner = useInput('');
  const experience = useInput('');

  useEffect(() => {
    nickname.setValue(profileDummyData.nickName);
    letterPrice.setValue(profileDummyData.letterPrice);
    chatPrice.setValue(profileDummyData.chatPrice);
    oneLiner.setValue(profileDummyData.oneLiner);
    experience.setValue(profileDummyData.experience);
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
              최대 10자 / 한글, 영문, 숫자 가능 (특수문자 불가)
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
          <Input width="100%" height="4.8rem" />
        </div>
        <div className="style">
          <ProfileInformTag>상담 스타일</ProfileInformTag>
          <Input width="100%" height="4.8rem" />
        </div>
      </ModifyProfileBox>
      <ModifyProfileBox>
        <div className="type">
          <ProfileInformTag>상담 방식</ProfileInformTag>
          <Input width="100%" height="4.8rem" />
        </div>
        <div className="available-time">
          <ProfileInformTag>상담 가능시간</ProfileInformTag>
          <Input width="100%" height="4.8rem" />
        </div>
        <div className="price">
          {' '}
          <ProfileInformTag>상담 가격</ProfileInformTag>
          <div className="letter-price">
            <PriceInformTag>편지</PriceInformTag>
            <Input
              width="calc(100% - 5.4rem)"
              height="4.8rem"
              fontSize="1.6rem"
              fontWeight="400"
              placeholder="1회당 최소 5,000원~최대 50,000원"
              value={letterPrice.value}
              onChange={(e) => {
                letterPrice.handleCheckSpecialLetter(e.target.value);
                letterPrice.onChange(e);
              }}
            />
          </div>
          <div className="chat-price">
            <PriceInformTag>채팅</PriceInformTag>
            <Input
              width="calc(100% - 5.4rem)"
              height="4.8rem"
              fontSize="1.6rem"
              fontWeight="400"
              placeholder="30분당 최소 5,000원~최대 50,000원"
              value={chatPrice.value}
              onChange={chatPrice.onChange}
            />
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
              oneLiner.handleCheckSpecialLetter(e.target.value);
              oneLiner.onChange(e);
            }}
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
            value={experience.value}
            onChange={(e) => {
              experience.handleCheckSpecialLetter(e.target.value);
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
              {experience.isError ? (
                ''
              ) : experience.isValid ? (
                <CheckIcon stroke={SafeColor} />
              ) : (
                <CheckIcon stroke={Grey5} />
              )}
              최대 20,000자 / 한글, 영문, 숫자 가능 (특수문자 불가)
            </Caption2>
            <CheckIcon />
          </ConditionMessage>
        </div>
      </ModifyProfileBox>
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
