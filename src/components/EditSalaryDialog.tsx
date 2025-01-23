import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconButton } from "@/components"
import { Edit } from "lucide-react"
import { updateSalary } from "@lib/actions"
import { useState } from "react"
import { toast } from "sonner"

export function EditSalaryDialog({ amount, email }: Readonly<{ amount: number, email: string }>) {

  const [amountEdit, setAmountEdit] = useState<number>(amount)

  const handleClickGuardar = async () => {
    const promise = async () => {
      const result = await updateSalary(email, amountEdit)

      if (result.error) {
        throw new Error('Error al guardar el salario')
      }

      return { message: 'Salario actualizado exitosamente' }
    }

    toast.promise(promise, {
      loading: 'Guardando cambios...',
      success: (data) => data.message,
      error: (err) => err.message,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton>
          <Edit className="size-6 stroke-custom-gray transition-all duration-200 hover:stroke-custom-light-gray" />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar sueldo</DialogTitle>
          <DialogDescription>
            Haga cambios en su salario aquí. Haga clic en guardar cuando esté listo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sueldo" className="text-right">
              Sueldo
            </Label>
            <Input
              id="sueldo"
              onChange={e => setAmountEdit(parseFloat(e.target.value))}
              defaultValue={amount}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={handleClickGuardar}>Guardar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
