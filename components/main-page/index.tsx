import { useState } from "react";
import { ConfigProvider, Tabs, Input } from "antd";
import type { TabsProps } from "antd";
import History from "../history";
import "./index.css";

const MainPage: React.FC = () => {
    const [keyword, setKeyword] = useState<string>();

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: chrome.i18n.getMessage("historyName"),
            children: <History keyword={keyword} />,
        },
        {
            key: "2",
            label: chrome.i18n.getMessage("bookmarkName"),
            children: "Content of Tab Pane 2",
        },
    ];

    return (
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
                tabBarExtraContent={
                    <Input.Search
                        allowClear
                        placeholder={chrome.i18n.getMessage(
                            "searchPlaceholder"
                        )}
                        onSearch={(value) => setKeyword(value)}
                    />
                }
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
};

export default MainPage;
