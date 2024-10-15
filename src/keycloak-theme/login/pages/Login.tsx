import { useState, useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
// import { assert } from "keycloakify/tools/assert";
// import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
// import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import { I18n } from "../i18n";
import Input from "@components/shared/Input";
import Button from "@components/shared/Button";
import Divider from "@components/shared/Divider";
import KakaoLoginButton from "@components/shared/Login/KaKaoLoginButton";
import NaverLoginButton from "@components/shared/Login/NaverLoginButton";
import GoogleLoginButton from "@components/shared/Login/GoogleLoginButton";
import AppleLoginButton from "@components/shared/Login/AppleLoginButton";
import Logo from "@assets/imgs/logo.svg";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const {
    kcContext,
    // i18n,
    // doUseDefaultCss,
    // Template,
    // classes,
  } = props;

  // const { kcClsx } = getKcClsx({
  //   doUseDefaultCss,
  //   classes,
  // });

  const {
    // social,
    // realm,
    url,
    // usernameHidden,
    // login,
    // auth,
    // registrationDisabled,
    messagesPerField,
  } = kcContext;

  // const { msg, msgStr } = i18n;

  // const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = url.registrationUrl;
  };

  // keycloak 서버에서 리다이렉트 되었을 때 에러가 있는지 확인 필요
  useEffect(() => {
    if (messagesPerField.existsError("username", "password")) {
      setIsError(true);
    }
  }, [messagesPerField]);

  return (
    <>
      {isError && (
        <div className="flex items-center justify-center absolute h-full w-full bg-gray-600 opacity-70">
          <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-md">
            <div
              className="bg-white text-sm"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(
                  // messagesPerField.getFirstError("username", "password")
                  "password is invalid"
                ),
              }}
            />
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="button"
                onClick={() => {
                  setIsError(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto my-0 max-w-[380px] flex gap-7 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-1">
          <img alt="Your Company" className="mx-auto h-10 w-auto" src={Logo} />
          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            통합 로그인
          </h2>
        </div>

        <form action={url.loginAction} className="space-y-6" method="POST">
          <Input
            id="username"
            name="username"
            placeholder="아이디"
            type="text"
            value={username}
            required
            onChange={onChangeUsername}
          />
          <Input
            id="password"
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />

          <div className="flex flex-col gap-2">
            <Button disabled={!username || !password} type="submit">
              로그인
            </Button>
            <Button theme="gray" onClick={handleClickRegistration}>
              회원가입
            </Button>
          </div>
        </form>
        <div className="flex flex-col gap-4">
          <Divider>간편 로그인</Divider>
          <div className="flex justify-center gap-4">
            <KakaoLoginButton />
            <NaverLoginButton />
            <GoogleLoginButton />
            <AppleLoginButton />
          </div>
          <div className="flex justify-center">
            <span className="hover:underline cursor-pointer text-[#606c85] text-base">
              비밀번호 찾기
            </span>
          </div>
        </div>
      </div>
      <footer className="flex flex-col justify-center items-center relative  gap-1">
        <div className="flex items-center gap-2 relative">
          <span className="text-sm text-[#434c5e]">아이디 찾기</span>
          <div className="w-[1px] h-4 bg-[#ccd2dd] flex-1" />
          <strong className="text-sm text-[#434c5e]">비밀번호 찾기</strong>
        </div>
        <div className="text-[#8e97aa] text-xs">
          Copyright © <strong>t’order Corp.</strong> All rights reserved.
        </div>
      </footer>
    </>
    // <Template
    //   kcContext={kcContext}
    //   i18n={i18n}
    //   doUseDefaultCss={doUseDefaultCss}
    //   classes={classes}
    //   displayMessage={!messagesPerField.existsError("username", "password")}
    //   headerNode={msg("loginAccountTitle")}
    //   displayInfo={
    //     realm.password && realm.registrationAllowed && !registrationDisabled
    //   }
    //   infoNode={
    //     <div id="kc-registration-container">
    //       <div id="kc-registration">
    //         <span>
    //           {msg("noAccount")}{" "}
    //           <a tabIndex={8} href={url.registrationUrl}>
    //             {msg("doRegister")}
    //           </a>
    //         </span>
    //       </div>
    //     </div>
    //   }
    //   socialProvidersNode={
    //     <>
    //       {realm.password &&
    //         social?.providers !== undefined &&
    //         social.providers.length !== 0 && (
    //           <div
    //             id="kc-social-providers"
    //             className={kcClsx("kcFormSocialAccountSectionClass")}
    //           >
    //             <hr />
    //             <h2>{msg("identity-provider-login-label")}</h2>
    //             <ul
    //               className={kcClsx(
    //                 "kcFormSocialAccountListClass",
    //                 social.providers.length > 3 &&
    //                   "kcFormSocialAccountListGridClass"
    //               )}
    //             >
    //               {social.providers.map((...[p, , providers]) => (
    //                 <li key={p.alias}>
    //                   <a
    //                     id={`social-${p.alias}`}
    //                     className={kcClsx(
    //                       "kcFormSocialAccountListButtonClass",
    //                       providers.length > 3 && "kcFormSocialAccountGridItem"
    //                     )}
    //                     type="button"
    //                     href={p.loginUrl}
    //                   >
    //                     {p.iconClasses && (
    //                       <i
    //                         className={clsx(
    //                           kcClsx("kcCommonLogoIdP"),
    //                           p.iconClasses
    //                         )}
    //                         aria-hidden="true"
    //                       ></i>
    //                     )}
    //                     <span
    //                       className={clsx(
    //                         kcClsx("kcFormSocialAccountNameClass"),
    //                         p.iconClasses && "kc-social-icon-text"
    //                       )}
    //                       dangerouslySetInnerHTML={{
    //                         __html: kcSanitize(p.displayName),
    //                       }}
    //                     ></span>
    //                   </a>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         )}
    //     </>
    //   }
    // >
    //   <div id="kc-form">
    //     <div id="kc-form-wrapper">
    //       {realm.password && (
    //         <form
    //           id="kc-form-login"
    //           onSubmit={() => {
    //             setIsLoginButtonDisabled(true);
    //             return true;
    //           }}
    //           action={url.loginAction}
    //           method="post"
    //         >
    //           {!usernameHidden && (
    //             <div className={kcClsx("kcFormGroupClass")}>
    //               <label htmlFor="username" className={kcClsx("kcLabelClass")}>
    //                 {!realm.loginWithEmailAllowed
    //                   ? msg("username")
    //                   : !realm.registrationEmailAsUsername
    //                   ? msg("usernameOrEmail")
    //                   : msg("email")}
    //               </label>
    //               <input
    //                 tabIndex={2}
    //                 id="username"
    //                 className={kcClsx("kcInputClass")}
    //                 name="username"
    //                 defaultValue={login.username ?? ""}
    //                 type="text"
    //                 autoFocus
    //                 autoComplete="username"
    //                 aria-invalid={messagesPerField.existsError(
    //                   "username",
    //                   "password"
    //                 )}
    //               />
    //               {messagesPerField.existsError("username", "password") && (
    //                 <span
    //                   id="input-error"
    //                   className={kcClsx("kcInputErrorMessageClass")}
    //                   aria-live="polite"
    //                   dangerouslySetInnerHTML={{
    //                     __html: kcSanitize(
    //                       messagesPerField.getFirstError("username", "password")
    //                     ),
    //                   }}
    //                 />
    //               )}
    //             </div>
    //           )}

    //           <div className={kcClsx("kcFormGroupClass")}>
    //             <label htmlFor="password" className={kcClsx("kcLabelClass")}>
    //               {msg("password")}
    //             </label>
    //             <PasswordWrapper
    //               kcClsx={kcClsx}
    //               i18n={i18n}
    //               passwordInputId="password"
    //             >
    //               <input
    //                 tabIndex={3}
    //                 id="password"
    //                 className={kcClsx("kcInputClass")}
    //                 name="password"
    //                 type="password"
    //                 autoComplete="current-password"
    //                 aria-invalid={messagesPerField.existsError(
    //                   "username",
    //                   "password"
    //                 )}
    //               />
    //             </PasswordWrapper>
    //             {usernameHidden &&
    //               messagesPerField.existsError("username", "password") && (
    //                 <span
    //                   id="input-error"
    //                   className={kcClsx("kcInputErrorMessageClass")}
    //                   aria-live="polite"
    //                   dangerouslySetInnerHTML={{
    //                     __html: kcSanitize(
    //                       messagesPerField.getFirstError("username", "password")
    //                     ),
    //                   }}
    //                 />
    //               )}
    //           </div>

    //           <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
    //             <div id="kc-form-options">
    //               {realm.rememberMe && !usernameHidden && (
    //                 <div className="checkbox">
    //                   <label>
    //                     <input
    //                       tabIndex={5}
    //                       id="rememberMe"
    //                       name="rememberMe"
    //                       type="checkbox"
    //                       defaultChecked={!!login.rememberMe}
    //                     />{" "}
    //                     {msg("rememberMe")}
    //                   </label>
    //                 </div>
    //               )}
    //             </div>
    //             <div className={kcClsx("kcFormOptionsWrapperClass")}>
    //               {realm.resetPasswordAllowed && (
    //                 <span>
    //                   <a tabIndex={6} href={url.loginResetCredentialsUrl}>
    //                     {msg("doForgotPassword")}
    //                   </a>
    //                 </span>
    //               )}
    //             </div>
    //           </div>

    //           <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
    //             <input
    //               type="hidden"
    //               id="id-hidden-input"
    //               name="credentialId"
    //               value={auth.selectedCredential}
    //             />
    //             <input
    //               tabIndex={7}
    //               disabled={isLoginButtonDisabled}
    //               className={kcClsx(
    //                 "kcButtonClass",
    //                 "kcButtonPrimaryClass",
    //                 "kcButtonBlockClass",
    //                 "kcButtonLargeClass"
    //               )}
    //               name="login"
    //               id="kc-login"
    //               type="submit"
    //               value={msgStr("doLogIn")}
    //             />
    //           </div>
    //         </form>
    //       )}
    //     </div>
    //   </div>
    // </Template>
  );
}

// function PasswordWrapper(props: {
//   kcClsx: KcClsx;
//   i18n: I18n;
//   passwordInputId: string;
//   children: JSX.Element;
// }) {
//   const { kcClsx, i18n, passwordInputId, children } = props;

//   const { msgStr } = i18n;

//   const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer(
//     (isPasswordRevealed: boolean) => !isPasswordRevealed,
//     false
//   );

//   useEffect(() => {
//     const passwordInputElement = document.getElementById(passwordInputId);

//     assert(passwordInputElement instanceof HTMLInputElement);

//     passwordInputElement.type = isPasswordRevealed ? "text" : "password";
//   }, [isPasswordRevealed]);

//   return (
//     <div className={kcClsx("kcInputGroup")}>
//       {children}
//       <button
//         aria-controls={passwordInputId}
//         aria-label={msgStr(
//           isPasswordRevealed ? "hidePassword" : "showPassword"
//         )}
//         className={kcClsx("kcFormPasswordVisibilityButtonClass")}
//         type="button"
//         onClick={toggleIsPasswordRevealed}
//       >
//         <i
//           className={kcClsx(
//             isPasswordRevealed
//               ? "kcFormPasswordVisibilityIconHide"
//               : "kcFormPasswordVisibilityIconShow"
//           )}
//           aria-hidden
//         />
//       </button>
//     </div>
//   );
// }
