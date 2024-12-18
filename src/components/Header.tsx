import { UserMenu } from "@components/UserMenu";
import { BentoItemContainer } from "./BentoItemContainer";

export const Header = () => {
  return (
    <BentoItemContainer className="m-auto max-w-[1670px] mt-4">
      <div className="flex justify-between max-w-[1670px] text-start m-auto w-full">
        <h1 className=" text-3xl font-bold ">Expenses Budget</h1>
        <UserMenu />
      </div>
    </BentoItemContainer>
  );
};