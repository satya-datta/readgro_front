import LoginMain from "@/components/layout/main/LoginMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Login/Register | ReadGro - Learn and Earn",
  description: "Login/Register | ReadGro - Learn and Earn",
};
const Login = () => {
  return (
    <PageWrapper>
      <main>
        <LoginMain />
      </main>
    </PageWrapper>
  );
};

export default Login;
