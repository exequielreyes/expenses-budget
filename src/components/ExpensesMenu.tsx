import { SelectDropdown } from "@components/SelectDropdown";
import { BentoItemContainer } from "@components/BentoItemContainer";
import { getMonth, getYear } from "@utils/getCurrentDate";

const monts = [
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const years = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

export const ExpensesMenu = () => {

  return (
    <BentoItemContainer>
      <div className="py-4">
        <h3 className="font-bold">Seleccionar periodo</h3>
        <h4 className="text-sm text-custom-light-gray">Elegí el periodo del cual deseas ver tus gastos</h4>
      </div>
      <div className="flex gap-4 w-full ">
        <SelectDropdown values={monts} selectedValue={getMonth().toString()} setSelectedValue={() => { }} />
        <SelectDropdown values={years} selectedValue={getYear().toString()} setSelectedValue={() => { }} />
      </div>
    </BentoItemContainer>
  );
};