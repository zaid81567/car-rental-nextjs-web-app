import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <SignIn />
    </div>
  );
}
