import { UserMenu } from "@components/UserMenu";
import { BentoItemContainer } from "./BentoItemContainer";

export const Header = () => {
  return (
    <BentoItemContainer className="m-auto max-w-[1670px] mt-4">
      <div className="flex justify-between max-w-[1670px] text-start m-auto w-full">
        <div className="flex gap-4 items-center">
          <h1 className=" text-3xl font-bold ">Expenses Budget</h1>
          {/* Falta toda la logica de esto (los estilos son provisorios), solo es como para ver como va a quedar */}
          <nav className="flex gap-6 justify-between [&>h2]:font-bold mx-6 [&>h2]:cursor-pointer">
            <h2>Gastos</h2>
            <h2 className="text-custom-light-gray hover:text-white transition-colors">Analíticas</h2>
          </nav>
        </div>
        <UserMenu />
      </div>
    </BentoItemContainer>
  );
};