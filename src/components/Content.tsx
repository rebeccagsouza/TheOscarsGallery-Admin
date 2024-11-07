// src/components/Content.tsx

import React, { useState } from "react";
import { Button, Input, Spin } from "antd";
import api from "@/services/api";

type ContentProps = {
  activeKey: string;
};

export default function Content({ activeKey }: ContentProps) {
  const [yearInput, setYearInput] = useState(""); // Ano para a rota de salvar filmes vencedores
  const [inputValue, setInputValue] = useState(""); // Usado para outras chaves
  const [jsonInput, setJsonInput] = useState(""); // JSON para salvar filmes vencedores
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Mapeamento de rotas e métodos
  const routeMap: {
    [key: string]: {
      url: string;
      method: "get" | "post" | "put" | "delete";
      label: string;
    };
  } = {
    "1": {
      url: "/movies/oscar-winners/save/year",
      method: "post",
      label: "Adicionar novo ano no banco",
    },
    "2": {
      url: "/movies/oscar-winners/update/year",
      method: "put",
      label: "Atualizar novo ano no banco",
    },
    "3": {
      url: "/movies/oscar-winners/delete/year",
      method: "delete",
      label: "Deletar algum ano do banco",
    },
    "4": {
      url: "/movies/oscar-winners/update-imdb/year",
      method: "put",
      label: "Adicionar mais dados via banco do imdb",
    },
    "5": {
      url: "/movies/imdb",
      method: "get",
      label: "Buscar informações de algum filme",
    },
  };

  const handleApiCall = async () => {
    if (!routeMap[activeKey]) {
      setError("Rota inválida");
      return;
    }

    const { url, method } = routeMap[activeKey];

    try {
      setLoading(true); // Inicia o carregamento
      setError(null);
      let payload;
      let fullUrl = url;

      if (activeKey === "1") {
        if (!yearInput || !jsonInput) {
          setError("Por favor, preencha o ano e o JSON.");
          setLoading(false); // Finaliza o carregamento se houver erro
          return;
        }
        fullUrl = `${url}/${yearInput}`;
        payload = JSON.parse(jsonInput);
      } else {
        fullUrl = `${url}/${inputValue}`;
        payload = undefined;
      }

      const res = await api({ method, url: fullUrl, data: payload });
      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data || "Erro ao realizar a requisição");
    } finally {
      setLoading(false); 
      setInputValue('')
      setJsonInput('')
      setYearInput('')
    }
  };

  const inputStyle = "mb-4 w-[300px] mr-[8px]";

  return (
    <Spin spinning={loading} tip="Carregando...">
    <div>
      <h3 className="text-[#4e5861] text-2xl font-semibold">
        {activeKey
          ? `${routeMap[activeKey]?.label}`
          : "Selecione uma ação no menu"}
      </h3>
      {activeKey ? (
        <h5 className="mb-4 text-[#5d3ac5] text-[14px] font-semibold italic">
          {routeMap[activeKey]?.url}
        </h5>
      ) : (
        ""
      )}
      {activeKey && (
        <div>
          {activeKey === "1" ? (
            <div>
              <Input
                placeholder="Digite o ano"
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)}
                className={inputStyle}
              />
              <Input.TextArea
                placeholder="Insira o JSON para salvar os filmes vencedores"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={8}
                style={{ marginBottom: "1rem", width: "100%" }}
              />
            </div>
          ) : (
            <Input
              placeholder="Digite o ano ou IMDb ID"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={inputStyle}
            />
          )}
          <Button type="primary" onClick={handleApiCall}>
            Disparar Requisição
          </Button>
                {response && (
                    <div className="mt-4 bg-[#31302f] p-4 text-[#a4bb2a] rounded-md">
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
           
        </div>
      )}
    </div> 
    </Spin>
  );
}
