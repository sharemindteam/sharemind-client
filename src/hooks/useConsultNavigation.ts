import { getCounselorsRandomConsult } from 'api/get';
import { useNavigate } from 'react-router-dom';

function useConsultNavigation(consultId: string) {
  const navigate = useNavigate();

  const handleNavigateRandomConsult = async () => {
    const randomConsultListString =
      localStorage.getItem('randomConsult') ?? `[${consultId}]`;
    // 공개상담 탭 눌렀을 때, random api 호출하여 로컬 스토리지에 값 저장
    // 로컬스토리지에 값이 없을 땐 (URL링크로 바로 들어올 경우) path variable를 하나의 원소로 하는 리스트 형태로 저장
    const randomConsultList: number[] = JSON.parse(randomConsultListString);

    if (randomConsultList.length > 1) {
      const currentIndex = randomConsultList.indexOf(parseInt(consultId));
      const nextIndex = (currentIndex + 1) % randomConsultList.length;
      const nextConsultId = randomConsultList[nextIndex];

      const updatedConsultList = randomConsultList.filter(
        (id) => id !== parseInt(consultId),
      );
      localStorage.setItem('randomConsult', JSON.stringify(updatedConsultList));
      navigate(`/minder/open-consult/${nextConsultId}`);
    } else {
      try {
        // 로컬 스토리지에 저장된 상담 리스트의 길이가 1인경우 -> 사용자에게 상담을 모두 순회했다고 알림
        const response: any = await getCounselorsRandomConsult();

        if (response.status === 200) {
          alert('현재 올라온 상담글을 모두 정독하셨습니다.');
          if (response.data.length > 0) {
            localStorage.setItem(
              'randomConsult',
              JSON.stringify(response.data),
            );
            navigate(`/minder/open-consult/${response.data[0]}`);
          } else {
            navigate('/minder/open-consult/all-adopted');
          }
        } else if (response?.response.status === 403) {
          alert('공개 상담 페이지에 접근할 권한이 없습니다.');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return { handleNavigateRandomConsult };
}

export default useConsultNavigation;
