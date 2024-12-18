import { UserMenu } from "@components/UserMenu";

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 bg-black h-[100px] w-full">
      <div className="flex justify-between max-w-[1670px] text-start m-auto w-full">
        <h1 className=" text-3xl font-bold ">Expenses Budget</h1>
        <UserMenu />
      </div>
    </header>
  );
};