import LoginMain from "@/components/layout/main/LoginMain";

import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export const metadata = {
  title: "Login/Register - Dark | ReadGro - Learn and Earn",
  description: "Login/Register - Dark | ReadGro - Learn and Earn",
};
const Login_Dark = () => {
  return (
    <PageWrapper>
      <main className="is-dark">
        <LoginMain />
      </main>
    </PageWrapper>
  );
};

export default Login_Dark;
