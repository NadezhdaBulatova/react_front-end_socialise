import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRefreshToken,
  selectAccessTokenExp,
} from "../store/features/auth/authSlice";
import dayjs from "dayjs";
import {
  useRefreshTokensMutation,
  useGetProfileQuery,
} from "../store/services/api";
import { setTokens } from "../store/features/auth/authSlice";
import { useAuth } from "../utils/hooks/useAuth";
import Menu from "./Menu";

const MainBg = ({ children, img }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const refresh_tkn = useSelector(selectRefreshToken);
  const access_tkn_exp = useSelector(selectAccessTokenExp);
  const isExpired = dayjs.unix(access_tkn_exp).subtract(1, "minute") < dayjs();
  console.log("expired", isExpired);
  const [refresh, { data: refresh_data }] = useRefreshTokensMutation();
  const {
    data: profile_data,
    error,
    isFetching,
    isLoading,
  } = useGetProfileQuery(user.id, { pollingInterval: 240000 });
  useEffect(() => {
    console.log("useEffect started");
    if (isExpired) {
      console.log("started updating token");
      test();
      console.log("finished updating token");
    }
    console.log("useEffect finished");
  }, [isExpired]);
  const test = async () => {
    const data = await refresh(refresh_tkn).unwrap();
    dispatch(setTokens(data));
  };

  if (profile_data)
    return (
      <>
        <div
          className="fixed w-full h-screen z-0"
          style={{
            backgroundImage: `url(${profile_data.background_img})`,
          }}
        >
          <div className="w-full h-full bg-slate-900/70"></div>
        </div>
        <div className="relative w-full h-screen z-2">
          <div className="w-full p-1 lg:p-2">
            <Menu />
          </div>
          <div className="w-full md:h-[90%] md:min-h-fit flex-none p-1 md:p-2 md:pt-0">
            <div className="flex flex-1 h-full flex-col md:flex-row">
              {children}
            </div>
          </div>
        </div>
      </>
    );
  if (!profile_data && isFetching) {
    return <div>Loading ...</div>;
  }
};

export default MainBg;
