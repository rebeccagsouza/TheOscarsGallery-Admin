// src/components/Menu.tsx
import React from "react";
import { Layout, Menu } from "antd";

import {
    CloudUploadOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    ReloadOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";


const { Sider } = Layout;

const sidebarItems = [
  {
    key: "1",
    icon: <PlusSquareOutlined />,
    label: "Salvar Filmes Vencedores",
  },
  {
    key: "2",
    icon: <CloudUploadOutlined />,
    label: "Atualizar Filmes Vencedores",
  },
  {
    key: "3",
    icon: <DeleteOutlined />,
    label: "Deletar Filmes Vencedores",
  },
  {
    key: "4",
    icon: <ReloadOutlined />,
    label: "Atualizar com IMDb",
  },
  {
    key: "5",
    icon: <VideoCameraOutlined />,
    label: "Buscar Dados do Filme",
  },
];

type MenuProps = {
  setActiveKey: (key: string) => void;
};

export default function SidebarMenu({ setActiveKey}: MenuProps) {

  return (
    <Sider trigger={null} >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems}
        onClick={(e) => setActiveKey(e.key)}
      />
    </Sider>
  );
}
