import LoginMain from "@/components/layout/main/LoginMain";
import UserLoginMain from "@/components/layout/main/UserLoginMain";
import LoginWrapper from "@/components/shared/wrappers/LoginWrapper";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
export const metadata = {
  title: "Login/Register | ReadGro - Learn and Earn",
  description: "Login/Register | ReadGro - Learn and Earn",
};
const Login = () => {
  return (
    <LoginWrapper>
      <main>
        <UserLoginMain />
      </main>
    </LoginWrapper>
  );
};

export default Login;
