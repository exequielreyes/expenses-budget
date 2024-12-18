import { SelectDropdown } from "@components/SelectDropdown";
import { BentoItemContainer } from "./BentoItemContainer";

const monts = [
  { value: "enero", label: "Enero" },
  { value: "febrero", label: "Febrero" },
  { value: "marzo", label: "Marzo" },
  { value: "abril", label: "Abril" },
  { value: "mayo", label: "Mayo" },
  { value: "junio", label: "Junio" },
  { value: "julio", label: "Julio" },
  { value: "agosto", label: "Agosto" },
  { value: "septiembre", label: "Septiembre" },
  { value: "octubre", label: "Octubre" },
  { value: "noviembre", label: "Noviembre" },
  { value: "diciembre", label: "Diciembre" },
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
        <h4 className="text-sm text-custom-light-gray">Elegí el periodo del que deseas ver los gastos</h4>
      </div>
      <div className="flex gap-4 w-full ">
        <SelectDropdown values={monts} placeholder="Mes" />
        <SelectDropdown values={years} placeholder="Año" />
      </div>
    </BentoItemContainer>
  );
};