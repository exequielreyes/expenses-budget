import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectDropdown = {
  name?: string
  values: { value: string, label: string }[]
  selectedValue: string,
  setSelectedValue: (value: string) => void
}

export const SelectDropdown = ({ name, values, selectedValue, setSelectedValue }: SelectDropdown) => {

  return (
    <Select onValueChange={setSelectedValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={values.find(({ value }) => value === selectedValue)?.label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {name && <SelectLabel>{name}</SelectLabel>}
          {values.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
