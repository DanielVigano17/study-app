'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { novaMateriaAction } from "../actions"
import { Loader2 } from "lucide-react"
import { useContext } from "react"
import { ApplicationContext } from "@/app/_context/app.context"
import { Materia } from "@/domain/entities/Materia"

export function AddCardDialog({onAddMateria} : {onAddMateria : (materia : Materia) => void}) {
  const form = useForm();

  const {session} = useContext(ApplicationContext);
  
  const handleSubmit = form.handleSubmit( async (data) =>{
    const novaMateria = await novaMateriaAction({titulo : data.titulo, image : data.link}, session?.user?.id);
    if(novaMateria) onAddMateria(novaMateria);
  });
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-0 px-2 text-xs" variant="default">Adicionar Card</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} method='post' action="#" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="titulo"
              {...form.register("titulo")}
              placeholder="Digite o nome do card"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link da Imagem</Label>
            <Input
              id="link"
              {...form.register("link")}
              placeholder="Digite o link da imagem"
            />
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

