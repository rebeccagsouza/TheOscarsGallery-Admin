"use client";

import React from "react";
import Form from "@components/Form";

export default function DashboardPage() {
  return (
    <div className="flex h-screen p-8">
      {/* Lado esquerdo: Respostas do backend */}
      <div className="flex-1 bg-gray-100 p-4 rounded shadow-md overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">Resposta do Backend</h2>
        <Form />
      </div>
    </div>
  );
}
