export const metadata = {
  title: "Cadastro de Filmes",
  description: "App de cadastro de filmes com Next.js, RHF e Zod",
};

import "./globals.css";
import React from "react";

import { Tabs } from "@/components/Tabs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <header className="border-b bg-blue-400">
          <div className="container py-4">
            <h1 className="text-2xl font-semibold text-gray-900">Cadastro de Filmes</h1>
          </div>
        </header>
        <div className="container pt-4">
          <Tabs
            tabs={[{ label: "Inserir", href: "/" },
            { label: "Listar", href: "/listar" }]}
          />
        </div>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
