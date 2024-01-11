import styled from "styled-components";
import { Green, LightGreen } from "styles/color";

export const ProgressBar = styled.div`
  margin: 1.2rem 2rem 2.7rem;
  border-radius: 1.2rem;
  height: 0.9rem;
  background: ${LightGreen};
  position: sticky;
  top: 5.3rem;
`;

export const ProgressCurrentStatus = styled.div<{ width: string | undefined }>`
  border-radius: 1.2rem;
  transition: 0.5s;
  height: 0.9rem;
  background: ${Green};
  width: ${(props) => (props.width ? props?.width : '0%')};
`;