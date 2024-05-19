import styled from "styled-components";

export const EditBox = styled.div`
    width: 282px;
    height: 66px;
    margin-top: 10px;

    background-color: #6990FF;
    border: none;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #0056b3;
    }
`

export const EditBtn = styled.div`
    color: #FFF;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.02px;
`
export const Container = styled.div`
    height: 800px;
`
export const UserProfileBox = styled.div`
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
`
export const UserProfile = styled.div``
export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ProfileImg = styled.img``
export const Email = styled.div``
export const Nickname = styled.div`
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 0.024px;
`

export const NicknameBox = styled.div`
    margin-top: 18px;
    display: flex;
`
export const RankBox = styled.div`
  display: flex; /* 수정된 부분 */
  flex-direction: row; /* 수평 정렬 */
  font-weight: bold;
  align-items: center; /* 수직 정렬 */
  margin-top: 20px;
`;

export const RankImg = styled.div`
  width: 90px;
  height: 90px;
  font-weight: bold;
  margin-right: 10px; /* 이미지와 텍스트 사이의 간격 */
`;

export const RankText = styled.div`
  font-weight: bold;
`;

export const Logout = styled.img`
  margin-top: 20px;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;