import { Suspense } from "react";
import ThankYou from "@/components/ThankYou";

const Page = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default Page;
