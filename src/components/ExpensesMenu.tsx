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
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
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