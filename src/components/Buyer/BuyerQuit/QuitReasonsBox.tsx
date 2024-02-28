import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey4, Grey6, LightGreen, White } from 'styles/color';
import { Body1, Body3, Body4 } from 'styles/font';
import { checkedNumberState, quitLongReasonState } from 'utils/atom';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-complete-check.svg';
import { ReactComponent as NonCheckIcon } from 'assets/icons/icon-complete-non-check.svg';
import { ReactComponent as Heart } from 'assets/icons/icon-heart1.svg';
import { quitReasons, quitRecommends } from 'utils/constant';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface QuitReasonsBoxProps {
  index: number;
}
export const QuitReasonsBox = ({ index }: QuitReasonsBoxProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [quitReasonInput, setQuitReasonInput] =
    useRecoilState<string>(quitLongReasonState);
  const [checkedNumber, setCheckedNumber] =
    useRecoilState<number>(checkedNumberState);
  useEffect(() => {
    setQuitReasonInput('');
    if (inputRef.current) inputRef.current.style.height = '9rem';
  }, [checkedNumber]);
  useEffect(() => {
    if (quitReasonInput.trim() === '') {
      if (inputRef.current) inputRef.current.style.height = '9rem';
    }
  }, [quitReasonInput]);
  //체크된 경우
  if (index === checkedNumber) {
    if (index === 0) {
      return (
        <BoxWrapper
          IsChecked={true}
          onClick={(e) => {
            e.stopPropagation();
            setCheckedNumber(-1);
          }}
        >
          <div className="title-wrapper">
            {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
            <Body1 color={Grey1}>{quitReasons[index]}</Body1>
          </div>
          <LongReasonTextarea
            ref={inputRef}
            rows={1}
            placeholder="(선택사항) 서비스 이용 중 아쉬웠던 점을 이야기해주세요. 여러분의 소리에 귀 기울일게요. (100자 이내)"
            maxLength={100}
            value={quitReasonInput}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setQuitReasonInput(e.target.value);
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight / 10 + 'rem';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  //다음으로이동
                }
              }
            }}
          />
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            <Heart />
            <Body4 color={Grey1}>잠깐! 이렇게 해보시겠어요?</Body4>
          </div>
          <Body3 color={Grey1} margin="0 0.6rem">
            {quitRecommends[index]}
          </Body3>
        </BoxWrapper>
      );
    } else if (index === 1) {
      return (
        <BoxWrapper
          IsChecked={true}
          onClick={(e) => {
            e.stopPropagation();
            setCheckedNumber(-1);
          }}
        >
          <div className="title-wrapper">
            {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
            <Body1 color={Grey1}>{quitReasons[index]}</Body1>
          </div>
          <LongReasonTextarea
            ref={inputRef}
            rows={1}
            placeholder="(선택사항) 서비스 이용 중 아쉬웠던 점을 이야기해주세요. 여러분의 소리에 귀 기울일게요. (100자 이내)"
            maxLength={100}
            value={quitReasonInput}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setQuitReasonInput(e.target.value);
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight / 10 + 'rem';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  //다음으로이동
                }
              }
            }}
          />
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            <Heart />
            <Body4 color={Grey1}>잠깐! 이렇게 해보시겠어요?</Body4>
          </div>
          <Body3 color={Grey1} margin="0 0.6rem">
            {quitRecommends[index]}
          </Body3>
        </BoxWrapper>
      );
    } else if (index === 2) {
      return (
        <BoxWrapper
          IsChecked={true}
          onClick={(e) => {
            e.stopPropagation();
            setCheckedNumber(-1);
          }}
        >
          <div className="title-wrapper">
            {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
            <Body1 color={Grey1}>{quitReasons[index]}</Body1>
          </div>
          <LongReasonTextarea
            ref={inputRef}
            rows={1}
            placeholder="(선택사항) 서비스 이용 중 아쉬웠던 점을 이야기해주세요. 여러분의 소리에 귀 기울일게요. (100자 이내)"
            maxLength={100}
            value={quitReasonInput}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setQuitReasonInput(e.target.value);
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight / 10 + 'rem';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  //다음으로이동
                }
              }
            }}
          />
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            <Heart />
            <Body4 color={Grey1}>잠깐! 이렇게 해보시겠어요?</Body4>
          </div>
          <Body3 color={Grey1} margin="0 0.6rem 2.3rem 0.6rem">
            {quitRecommends[index]}
          </Body3>

          <Body4
            color={Green}
            margin="0 0.6rem"
            style={{ textDecorationLine: 'underline' }}
            onClick={() => {
              navigate('/service');
            }}
          >
            셰어마인드 소개 보러가기
          </Body4>
        </BoxWrapper>
      );
    } else if (index === 3) {
      return (
        <BoxWrapper
          IsChecked={true}
          onClick={(e) => {
            e.stopPropagation();
            setCheckedNumber(-1);
          }}
        >
          <div className="title-wrapper">
            {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
            <Body1 color={Grey1}>{quitReasons[index]}</Body1>
          </div>
          <LongReasonTextarea
            ref={inputRef}
            rows={1}
            placeholder="(선택사항) 서비스 이용 중 아쉬웠던 점을 이야기해주세요. 여러분의 소리에 귀 기울일게요. (100자 이내)"
            maxLength={100}
            value={quitReasonInput}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setQuitReasonInput(e.target.value);
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight / 10 + 'rem';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  //다음으로이동
                }
              }
            }}
          />
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
            <Heart />
            <Body4 color={Grey1}>잠깐! 이렇게 해보시겠어요?</Body4>
          </div>
          <Body3 color={Grey1} margin="0 0.6rem 2.3rem 0.6rem">
            {quitRecommends[index]}
          </Body3>

          <Body4
            color={Green}
            margin="0 0.6rem"
            style={{ textDecorationLine: 'underline' }}
            onClick={() => {
              navigate('/counselors');
            }}
          >
            더 많은 상담사 보러가기
          </Body4>
        </BoxWrapper>
      );
    } else if (index === 4) {
      return (
        <BoxWrapper
          IsChecked={true}
          onClick={(e) => {
            e.stopPropagation();
            setCheckedNumber(-1);
          }}
        >
          <div className="title-wrapper">
            {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
            <Body1 color={Grey1}>{quitReasons[index]}</Body1>
          </div>
          <LongReasonTextarea
            ref={inputRef}
            rows={1}
            placeholder="(선택사항) 서비스 이용 중 아쉬웠던 점을 이야기해주세요. 여러분의 소리에 귀 기울일게요. (100자 이내)"
            maxLength={100}
            value={quitReasonInput}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setQuitReasonInput(e.target.value);
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight / 10 + 'rem';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  //다음으로이동
                }
              }
            }}
          />
        </BoxWrapper>
      );
    } else if (index === 5) {
      return (
        <BoxWrapper
          IsChecked={true}
          onClick={(e) => {
            e.stopPropagation();
            setCheckedNumber(-1);
          }}
        >
          <div className="title-wrapper">
            {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
            <Body1 color={Grey1}>{quitReasons[index]}</Body1>
          </div>
          <LongReasonTextarea
            ref={inputRef}
            rows={1}
            placeholder="(선택사항) 서비스 이용 중 아쉬웠던 점을 이야기해주세요. 여러분의 소리에 귀 기울일게요. (100자 이내)"
            maxLength={100}
            value={quitReasonInput}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setQuitReasonInput(e.target.value);
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight / 10 + 'rem';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  //다음으로이동
                }
              }
            }}
          />
        </BoxWrapper>
      );
    } else if (index === 6) {
      return (
        <BoxWrapper
          IsChecked={true}
          onClick={(e) => {
            e.stopPropagation();
            setCheckedNumber(-1);
          }}
        >
          <div className="title-wrapper">
            {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
            <Body1 color={Grey1}>{quitReasons[index]}</Body1>
          </div>
          <LongReasonTextarea
            ref={inputRef}
            rows={1}
            placeholder="(선택사항) 서비스 이용 중 아쉬웠던 점을 이야기해주세요. 여러분의 소리에 귀 기울일게요. (100자 이내)"
            maxLength={100}
            value={quitReasonInput}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setQuitReasonInput(e.target.value);
              e.target.style.height = '4.8rem';
              e.target.style.height = e.target.scrollHeight / 10 + 'rem';
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                if (e.key === 'Enter' && e.shiftKey) return;
                else if (e.key === 'Enter') {
                  e.preventDefault();
                  //다음으로이동
                }
              }
            }}
          />
        </BoxWrapper>
      );
    }
  } else {
    return (
      <BoxWrapper
        IsChecked={false}
        onClick={() => {
          setCheckedNumber(index);
        }}
      >
        <div className="title-wrapper">
          {index === checkedNumber ? <CheckIcon /> : <NonCheckIcon />}
          <Body1 color={Grey1}>{quitReasons[index]}</Body1>
        </div>
      </BoxWrapper>
    );
  }
};
const BoxWrapper = styled.div<{ IsChecked: boolean }>`
  width: 33.5rem;
  background-color: ${(props) => (props.IsChecked ? LightGreen : Grey6)};
  border: 1px solid ${(props) => (props.IsChecked ? Green : Grey6)};
  border-radius: 0.8rem;
  padding: 1.6rem 1.2rem;
  box-sizing: border-box;
  .title-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  cursor: pointer;
`;

const LongReasonTextarea = styled.textarea`
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
  color: ${Grey1};
  &::placeholder {
    color: ${Grey4};
  }
  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  background-color: ${White};
  width: 31.1rem;
  padding: 1.2rem 1.6rem;
  box-sizing: border-box;
  margin: 1rem 0;
  border-radius: 0.8rem;
`;
