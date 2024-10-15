import GoogleIcon from "@assets/imgs/social/sns_google.svg";
const GoogleLoginButton = () => {
  const onClick = () => {};

  return (
    <button
      className="bg-white border-[#ebecf4] border box-border w-fit flex items-center p-[6px] rounded-full"
      type="button"
      onClick={onClick}
    >
      <img alt="google login image" className="min-w-9 h-9" src={GoogleIcon} />
    </button>
  );
};

export default GoogleLoginButton;
