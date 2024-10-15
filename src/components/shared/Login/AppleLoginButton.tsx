import AppleIcon from "@assets/imgs/social/sns_apple.svg";
const AppleLoginButton = () => {
  const onClick = () => {};

  return (
    <button
      className="bg-black w-fit flex items-center p-[6px] rounded-full"
      type="button"
      onClick={onClick}
    >
      <img alt="apple login icon" className="min-w-9 h-9" src={AppleIcon} />
    </button>
  );
};

export default AppleLoginButton;
