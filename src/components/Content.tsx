// src/components/Content.tsx

import React, { useState } from "react";
import { Button, Input } from "antd";
import api from "@/services/api";

type ContentProps = {
  activeKey: string;
};

export default function Content({ activeKey }: ContentProps) {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Mapeamento das chaves para rotas e métodos
  const routeMap: { [key: string]: { url: string; method: "get" | "post" | "put" | "delete" } } = {
    "1": { url: "/movies/oscar-winners/save/year", method: "post" },
    "2": { url: "/movies/oscar-winners/update/year", method: "put" },
    "3": { url: "/movies/oscar-winners/delete/year", method: "delete" },
    "4": { url: "/movies/oscar-winners/update-imdb/year", method: "put" },
    "5": { url: "/movies/imdb", method: "get" },
  };

  const handleApiCall = async () => {
    if (!routeMap[activeKey]) {
      setError("Rota inválida");
      return;
    }

    const { url, method } = routeMap[activeKey];

    try {
      setError(null);
      const fullUrl = activeKey === "5" ? `${url}/${inputValue}` : `${url}/${inputValue}`;
      const res = await api({ method, url: fullUrl });
      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data || "Erro ao realizar a requisição");
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">
        {activeKey ? `Ação selecionada: ${routeMap[activeKey]?.url}` : "Selecione uma ação no menu"}
      </h3>
      {activeKey && (
        <div>
          <Input
            placeholder="Digite o ano ou IMDb ID"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginBottom: "1rem", width: "300px" }}
          />
          <Button type="primary" onClick={handleApiCall}>
            Disparar Requisição
          </Button>
          <div style={{ marginTop: "1rem" }}>
            <h4>Resposta</h4>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
