import KaKaoIcon from "@assets/imgs/social/sns_kakao.svg";
const KakaoLogin = () => {
  const onClick = () => {};

  return (
    <button
      className="bg-[#fee500] w-fit flex items-center p-[6px] rounded-full"
      type="button"
      onClick={onClick}
    >
      <img alt="kakao login image" className="min-w-9 h-9" src={KaKaoIcon} />
    </button>
  );
};

export default KakaoLogin;
