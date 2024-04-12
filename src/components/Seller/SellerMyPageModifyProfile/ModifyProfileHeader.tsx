import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';
import { ReactComponent as XIcon } from 'assets/icons/icon-x.svg';
import { Heading } from 'styles/font';
import { TabB2 } from 'components/Common/TabB2';
import { isOutPopupOpenState } from 'utils/atom';
import { useSetRecoilState } from 'recoil';

//
//
//

interface ModifyProfileHeaderProps {
  isSetChatTime: boolean;
  isNoProfile: boolean;
  handleSelectTimeCloseClick: () => void;
}

//
//
//

export const ModifyProfileHeader = ({
  isSetChatTime,
  isNoProfile,
  handleSelectTimeCloseClick,
}: ModifyProfileHeaderProps) => {
  const setIsOutPopupOpen = useSetRecoilState(isOutPopupOpenState);

  //
  //
  //

  return (
    <TabB2>
      <div className="left-icon">
        {isSetChatTime ? (
          <XIcon onClick={handleSelectTimeCloseClick} />
        ) : (
          <LeftArrowIcon
            onClick={() => {
              setIsOutPopupOpen(true);
            }}
          />
        )}
      </div>
      <Heading>
        {isSetChatTime
          ? '상담 시간'
          : isNoProfile
          ? '판매정보 작성'
          : '판매정보 수정'}
      </Heading>
    </TabB2>
  );
};
