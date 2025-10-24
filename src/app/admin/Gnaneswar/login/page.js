import LoginMain from "@/components/layout/main/LoginMain";

import AdminWrapper from "@/components/shared/wrappers/AdminWrapper";
import LoginWrapper from "@/components/shared/wrappers/LoginWrapper";

import PlainWrapper from "@/components/shared/wrappers/PlainWrapper";
export const metadata = {
  title: "Login/Register | ReadGro - Learn and Earn",
  description: "Login/Register | ReadGro - Learn and Earn",
};
const Login = () => {
  return (
    <LoginWrapper>
      <main>
        <LoginMain />
      </main>
    </LoginWrapper>
  );
};

export default Login;
