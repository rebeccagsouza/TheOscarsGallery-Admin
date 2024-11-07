"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

type FormData = {
  year: string;
  imdbID: string;
};

export default function Form() {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleApiCall = async (url: string, method: 'post' | 'put' | 'delete' | 'get', data: any = {}) => {
    try {
      setError(null);
      const res = await axios({ method, url, data });
      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data || "Erro ao realizar a requisição");
    }
  };

  return (
    <div className="w-1/3 pl-4">
      <h2 className="text-2xl font-semibold mb-4">Ações</h2>
      <form className="space-y-4">
        {/* Salvar filmes vencedores do Oscar */}
        <div>
          <input type="text" placeholder="Ano" {...register("year")} className="p-2 border rounded mb-2 w-full" />
          <button
            type="button"
            onClick={() => handleApiCall(`/movies/oscar-winners/save/year/${watch("year")}`, "post")}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Salvar Filmes Vencedores
          </button>
        </div>

        {/* Atualizar filmes vencedores do Oscar */}
        <div>
          <input type="text" placeholder="Ano" {...register("year")} className="p-2 border rounded mb-2 w-full" />
          <button
            type="button"
            onClick={() => handleApiCall(`/movies/oscar-winners/update/year/${watch("year")}`, "put")}
            className="w-full bg-yellow-500 text-white p-2 rounded"
          >
            Atualizar Filmes Vencedores
          </button>
        </div>

        {/* Deletar filmes vencedores do Oscar */}
        <div>
          <input type="text" placeholder="Ano" {...register("year")} className="p-2 border rounded mb-2 w-full" />
          <button
            type="button"
            onClick={() => handleApiCall(`/movies/oscar-winners/delete/year/${watch("year")}`, "delete")}
            className="w-full bg-red-500 text-white p-2 rounded"
          >
            Deletar Filmes Vencedores
          </button>
        </div>

        {/* Atualizar filmes vencedores com dados do IMDb */}
        <div>
          <input type="text" placeholder="Ano" {...register("year")} className="p-2 border rounded mb-2 w-full" />
          <button
            type="button"
            onClick={() => handleApiCall(`/movies/oscar-winners/update-imdb/year/${watch("year")}`, "put")}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Atualizar com IMDb
          </button>
        </div>

        {/* Buscar informações de um filme pelo IMDb ID */}
        <div>
          <input type="text" placeholder="IMDb ID" {...register("imdbID")} className="p-2 border rounded mb-2 w-full" />
          <button
            type="button"
            onClick={() => handleApiCall(`/movies/imdb/${watch("imdbID")}`, "get")}
            className="w-full bg-purple-500 text-white p-2 rounded"
          >
            Buscar Dados do Filme
          </button>
        </div>
      </form>

      {/* Exibe resposta ou erro do backend */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Resposta</h3>
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
