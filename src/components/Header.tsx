import { UserAvatar } from "@components/UserAvatar";

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 bg-black h-[100px] w-full">
      <div className="flex justify-between max-w-[1670px] text-start m-auto w-full">
        <h1 className=" text-3xl font-bold ">Expenses Budget</h1>
        <UserAvatar image="https://leomoreno.vercel.app/me.webp" alt='@leomoreno' nameInitials='LM' />
      </div>
    </header>
  );
};