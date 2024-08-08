import { getCounselorsIsWriteComments } from 'api/get';
import { useEffect, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

//
//
//

function useIsAlreadyReply(consultid: string, navigate: NavigateFunction) {
  const [isAlreadyReply, setIsAlreadyReply] = useState<boolean>(false);

  //
  //
  //
  useEffect(() => {
    const fetchIsAlreadyWrite = async () => {
      const res: any = await getCounselorsIsWriteComments(consultid);
      if (res.status === 200) {
        setIsAlreadyReply(res.data);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담입니다.');
        navigate('/minder/consult?type=open-consult');
      }
    };
    fetchIsAlreadyWrite();
  }, [consultid, navigate]);

  return isAlreadyReply;
}

export default useIsAlreadyReply;
