import { Button } from 'components/Common/Button';
import { Flex } from 'components/Common/Flex';
import { useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';

import { Black, Grey5, White } from 'styles/color';
import { Body4 } from 'styles/font';
import { getPWAInstallCase } from 'utils/device';

const slideDown = keyframes`
  from {
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    transform: translateX(-50%) translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateX(-50%) translateY(0);
  }
  to {
    transform: translateX(-50%) translateY(-100%);
  }
`;

const ToastContainer = styled.div<{ isClosing: boolean }>`
  position: fixed;
  width: fit-content;
  box-sizing: border-box;
  left: 50%;
  top: 1rem;
  background-color: ${White};
  color: ${Black};
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  animation: ${({ isClosing }) => (isClosing ? slideUp : slideDown)} 0.3s ease
    forwards;
`;

const PWAInstallWrapper = ({ children }: { children: React.ReactNode }) => {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const installCase = getPWAInstallCase();

  const getPWAInstallToastContent = () => {
    switch (installCase) {
      case 'webview':
        return null;
      case 'direct':
        return '앱을 홈 화면에 추가하여 더 편리하게 사용하세요';
      // 모바일 safari만 처리
      case 'guide':
        return '공유 버튼 > 홈 화면에 추가를 눌러 더 편리하게 사용하세요';
      case 'unsupported':
        return null;
    }
  };

  const content = getPWAInstallToastContent();

  const [isToastVisible, setToastVisible] = useState(false); // Toast 표시 여부
  const [isClosing, setIsClosing] = useState(false); // Toast 닫히는 애니메이션 상태

  // `beforeinstallprompt` 이벤트 감지
  useEffect(() => {
    console.log(
      "BeforeInstallPromptEvent' in window",
      'BeforeInstallPromptEvent' in window,
    );

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault(); // 기본 동작 방지

      setInstallPromptEvent(event as BeforeInstallPromptEvent); // 이벤트 저장
      setToastVisible(true); // Toast 표시
    };

    if (installCase === 'direct') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    } else if (installCase === 'guide') {
      setToastVisible(true);
    }

    return () => {
      if (installCase === 'direct') {
        window.removeEventListener(
          'beforeinstallprompt',
          handleBeforeInstallPrompt,
        );
      }
    };
  }, []);

  // 설치 실행
  const handleInstall = async () => {
    console.log('installPromptEvent', installPromptEvent);
    if (installPromptEvent) {
      installPromptEvent.prompt(); // 설치 프롬프트 표시
      const choice = await installPromptEvent.userChoice;
      console.log(`User choice: ${choice.outcome}`); // "accepted" 또는 "dismissed"

      setInstallPromptEvent(null); // 이벤트 초기화
      handleCloseToast(); // Toast 닫기
    }
  };

  // Toast 닫기
  const handleCloseToast = () => {
    setIsClosing(true); // 닫히는 애니메이션 시작
    setTimeout(() => setToastVisible(false), 300); // 애니메이션 끝난 뒤 완전히 제거
  };

  if (installCase === 'unsupported' || installCase === 'webview') {
    return;
  }

  return (
    <>
      {children}

      {/* Toast UI */}
      {isToastVisible && (
        <ToastContainer isClosing={isClosing}>
          <Flex width="100%" justify="center">
            <Body4>{content}</Body4>
          </Flex>

          <Flex width="100%" justify="flex-end">
            <Flex gap="0.5rem">
              {installCase === 'direct' ? (
                <Button
                  text="설치"
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                  }}
                  onClick={handleInstall}
                />
              ) : null}
              <Button
                text="닫기"
                backgroundColor={Grey5}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                }}
                onClick={handleCloseToast}
              />
            </Flex>
          </Flex>
        </ToastContainer>
      )}
    </>
  );
};

export default PWAInstallWrapper;
