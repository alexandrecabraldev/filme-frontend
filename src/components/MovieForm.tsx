"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export const baseUrl= "http://localhost:3000/api";

// Schema do formulário apenas para validação básica (sem lógica de backend)
const atorSchema = z.object({ nome: z.string().min(1, "Informe o nome do ator") });
const baseSchema = z.object({
  titulo: z.string().trim().min(1, "Informe o título"),
  faixaEtaria: z.string().regex(/^(?:[0-9]|[1-9][0-9])$/, "A faixa etária deve estar entre 0 e 99").min(1, "Informe a faixa etária"),
  genero: z.string().trim().min(1, "Informe o gênero"),
  atores: z.array(atorSchema).min(1, "Informe pelo menos um ator"),
});

export type MovieFormValues = z.infer<typeof baseSchema>;

export interface MovieFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<MovieFormValues>; // partial, função do typescript que transforma todas as chaves do objeto em opcional
}

export function MovieForm({mode, defaultValues}: MovieFormProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      titulo: "",
      faixaEtaria: "",
      genero: "",
      atores: [{ nome: "" }],
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        titulo: defaultValues.titulo ?? "",
        faixaEtaria: defaultValues.faixaEtaria ?? "",
        genero: defaultValues.genero ?? "",
        atores: defaultValues.atores && defaultValues.atores.length > 0 ? defaultValues.atores : [{ nome: "" }],
      });
    }
  }, [defaultValues, reset]);

  const { fields, append, remove } = useFieldArray({ control, name: "atores" });

  const onSubmit = handleSubmit((values) => {
    // Sem lógica de API: apenas exibir no console os dados capturados
    console.log("Form values:", values);
    if (mode === "create") {
      //reset();
      axios.post(`${baseUrl}/filmes`, values).then((response)=>{
        console.log(response);
        alert("Filme inserido com sucesso!");
      }).catch(function (error) {
         console.log(error);
      });
    }
    //window.location.reload();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Título</label>
          <input className="input" {...register("titulo")} placeholder="Digite o título" />
          {errors.titulo && <p className="text-sm text-red-600 mt-1">{errors.titulo.message}</p>}
        </div>
        <div>
          <label className="label">Faixa etária</label>
          <input
            className="input"
            inputMode="numeric"
            {...register("faixaEtaria")}
            placeholder="Ex: 12, 14, 16"
            value={defaultValues?.faixaEtaria}
          />
          {errors.faixaEtaria && <p className="text-sm text-red-600 mt-1">{errors.faixaEtaria.message}</p>}
        </div>
        <div>
          <label className="label">Gênero</label>
          <input
            className="input"
            inputMode="text"
            {...register("genero")}
            placeholder="Ex: Ficção, Ação"
            value={defaultValues?.genero}
          />
          {errors.genero && <p className="text-sm text-red-600 mt-1">{errors.genero.message}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="label">Atores</label>
          <button
            type="button"
            className="button-secondary"
            onClick={() => append({ nome: "" })}
            aria-label="Adicionar ator"
          >
            + Adicionar ator
          </button>
        </div>
        <div className="space-y-2">
          {fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 items-start">
              <input
                className="input flex-1"
                placeholder={mode === "edit" ? "Nome do ator" : "Nome do ator"}
                {...register(`atores.${idx}.nome` as const)}
              />
              <button
                type="button"
                className="button-danger"
                onClick={() => remove(idx)}
                disabled={fields.length === 1}
                aria-label="Remover ator"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
        {errors.atores && (
          <p className="text-sm text-red-600 mt-1">{(errors.atores as unknown as { message?: string })?.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="button">
          {mode === "create" ? "Inserir" : "Salvar alterações"}
        </button>
        <button type="reset" className="button-secondary" onClick={() => reset()}>
          Limpar
        </button>
      </div>
    </form>
  );
}
