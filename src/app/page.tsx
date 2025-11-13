"use client";
import React from "react";
import { MovieForm } from "@/components/MovieForm";

export default function HomePage() {
  return (
    <section className="card p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Inserir filme</h2>
      {/* Formulário sem integração: apenas captura e validação com Zod */}
      <MovieForm mode="create" />
    </section>
  );
}
