import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import History from "../history";
import "./index.css";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: chrome.i18n.getMessage("historyName"),
        children: <History />,
    },
    {
        key: "2",
        label: chrome.i18n.getMessage("bookmarkName"),
        children: "Content of Tab Pane 2",
    },
];

const MainPage: React.FC = () => (
    <ConfigProvider
        theme={{
            cssVar: true,
            hashed: false,
            token: { colorPrimary: "#8A57EA" },
        }}
        componentSize="small"
    >
        <Tabs
            defaultActiveKey="1"
            animated={{ inkBar: true, tabPane: true }}
            items={items}
            tabBarStyle={{
                position: "sticky",
                top: 0,
                background: "#fff",
                zIndex: 9,
            }}
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 16px 16px",
            }}
        />
    </ConfigProvider>
);

export default MainPage;
