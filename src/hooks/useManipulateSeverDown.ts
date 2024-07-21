import { useQuery } from '@tanstack/react-query';
import { getIsServerShutdown } from 'api/get';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_SERVER_QUERY_KEY = 'getIsServerShutdown';

export type GetIsServerShutdownResponse = boolean;

function useManipulateServerDown() {
  const navigate = useNavigate();

  const { data: isShutDown } = useQuery<GetIsServerShutdownResponse>({
    queryKey: [ADMIN_SERVER_QUERY_KEY],
    queryFn: () => getIsServerShutdown().then((res) => res.data),
  });

  useEffect(() => {
    if (!isShutDown) {
      navigate('/service-unavailable');
    }
  }, [isShutDown, navigate]);
}

export default useManipulateServerDown;
