// src/app/dashboard/page.tsx
'use client'
import React, { useState } from "react";
import { Layout, Button, Breadcrumb, theme } from "antd";
import SidebarMenu from "@/components/Menu";
import Content from "@/components/Content";

const { Header, Content: AntContent } = Layout;

export default function DashboardPage() {
  const [activeKey, setActiveKey] = useState("1"); // Estado para gerenciar o item ativo do menu
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Layout>
        {/* Menu Lateral */}
        <SidebarMenu setActiveKey={setActiveKey} />

        {/* Área de Conteúdo */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "Dashboard" }, { title: "Content" }]}
            style={{ margin: "16px 0" }}
          />
          <AntContent
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Renderiza o Content com a activeKey atual */}
            <Content activeKey={activeKey} />
          </AntContent>
        </Layout>
      </Layout>
    </Layout>
  );
}
