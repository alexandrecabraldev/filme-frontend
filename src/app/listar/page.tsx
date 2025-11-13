"use client";
import React, {useEffect, useState} from "react";
import { MovieForm } from "@/components/MovieForm";
import axios from "axios";
import {baseUrl} from "@/components/MovieForm";
import {Filme} from "@/types/movie";

export default function ListarPage() {

  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [filmeEditar, setFilmeEditar] = useState<Filme>();
  async function buscarFilmes(){
    try{
      const response = await axios.get(`${baseUrl}/filmes`);
      setFilmes(response.data);
    }catch (e){
      console.log(e);
    }
  }
  useEffect(() => {
    buscarFilmes()
  }, []);

  return (
    <div className="space-y-6">
      <section className="card p-4">
        <h2 className="text-lg font-semibold mb-4">Lista de filmes</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="th">Título</th>
                <th className="th">Atores</th>
                <th className="th">Faixa etária</th>
                <th className="th">Gênero</th>
                <th className="th">Operações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                {filmes.length === 0 && "Nenhum filme cadastrado"}
              </tr>
                {filmes.map((filme) => (
                  <tr key={filme.id}>
                    <td>{filme.titulo}</td>
                    <td>{filme.atores.map((ator)=>(ator.nome)).join('/')}</td>
                    <td>{filme.faixaEtaria}</td>
                    <td>{filme.genero}</td>
                    <td>
                      <button
                        className="button-secondary"
                        onClick={async ()=>{
                          const data= await axios.put(`${baseUrl}/filmes/${filme.id}`, filme);
                          setFilmeEditar(data.data);
                        }}
                      >
                        Editar
                      </button>
                      <button
                          className="button-danger"
                          onClick={async ()=>{
                            try{
                              await axios.delete(`${baseUrl}/filmes/${filme.id}`)
                              buscarFilmes();
                              alert("Filme excluído com sucesso!");
                            }catch(e){
                              console.log(e);
                            }}
                          }
                      >Excluir</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Editar filme</h2>
        </div>
        {/* Formulário em modo edição apenas para capturar/validar dados, sem integração */}
        <MovieForm
          mode="edit"
          defaultValues={{ titulo: filmeEditar?.titulo, faixaEtaria: filmeEditar?.faixaEtaria, genero: filmeEditar?.genero, atores: [{ nome: "" }] }}
        />
      </section>
    </div>
  );
}
