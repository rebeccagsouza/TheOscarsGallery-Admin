// src/app/dashboard/page.tsx
'use client'
import React, { useState } from "react";
import { Layout, Button, Breadcrumb, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SidebarMenu from "@/components/Menu";
import Content from "@/components/Content";

const { Header, Content: AntContent } = Layout;

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1"); // Estado para gerenciar o item ativo do menu
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Cabeçalho */}
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginLeft: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Header>

      <Layout>
        {/* Menu Lateral */}
        <SidebarMenu collapsed={collapsed} setActiveKey={setActiveKey} />

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
