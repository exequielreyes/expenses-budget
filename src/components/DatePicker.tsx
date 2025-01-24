"use client"

import * as React from "react"
import { format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { es } from "date-fns/locale/es"

export function DatePicker({value, onChange}: {value: string, onChange: (date: string) => void}) {
  const [date, setDate] = React.useState<Date>(new Date(value + 'T00:00:00'))


  const handleChange = (date: Date) => {
    if (date === null || date === undefined) {
      return
    }
    setDate(date)
    onChange(date.toDateString())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-max justify-start text-left text-base font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {format(date, "dd/MM/yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={es}
          selected={date}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
