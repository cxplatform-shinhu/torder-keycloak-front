import NaverIcon from "@assets/imgs/social/sns_naver.svg";

const NaverLoginButton = () => {
  const onClick = () => {};

  return (
    <button
      className="bg-[#03c75a] w-fit flex items-center p-[6px] rounded-full"
      type="button"
      onClick={onClick}
    >
      <img alt="naver login image" className="min-w-9 h-9" src={NaverIcon} />
    </button>
  );
};

export default NaverLoginButton;
