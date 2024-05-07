import { getUserInfoFromState } from "../../store/features/user/userSlice";
import { useSelector } from "react-redux";

const InnerHeader = () => {

  const userInfo = useSelector(getUserInfoFromState);

  return (
    <div>
      <h2>Welcome {`${userInfo?.firstName}`}</h2>
      <div >
      </div>
    </div>
  );
};
export default InnerHeader;
