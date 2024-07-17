import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Typography } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { faviconURL } from "../../utils";
import styles from "./index.module.css";

dayjs.extend(relativeTime);

interface HistoryItem extends Partial<chrome.history.HistoryItem> {
    loading?: boolean;
    icon?: string;
    time?: string;
}

const count = 20;

const History: React.FC<{ keyword?: string }> = (props) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<HistoryItem[]>([]);
    const [list, setList] = useState<HistoryItem[]>([]);

    const getList = async (init?: boolean) => {
        const last = list[list.length - 1];

        const params = {
            text: props.keyword || "",
            maxResults: count,
            startTime: dayjs().subtract(1, "year").valueOf(),
            endTime: !init && last ? last.lastVisitTime : dayjs().valueOf(),
        };

        const res = await chrome.history.search(params);

        return res.map((item) => ({
            ...item,
            // icon: faviconURL(item.url),
            time: dayjs(item.lastVisitTime).fromNow(),
        }));
    };

    const setHistory = (list: HistoryItem[]) => {
        const ids = [];
        const res = [];
        list.forEach((item) => {
            if (ids.indexOf(item.id) === -1) {
                ids.push(item.id);
                res.push(item);
            }
        });
        setData(res);
        setList(res);
    };

    useEffect(() => {
        setInitLoading(true);
        setHistory([]);

        getList(true).then((res) => {
            setInitLoading(false);
            setHistory(res);
        });
    }, [props.keyword]);

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                }))
            )
        );
        getList().then((res) => {
            const newData = data.concat(res);
            setHistory(newData);
            setLoading(false);
        });
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: "center",
                    marginTop: 12,
                    height: 32,
                    lineHeight: "32px",
                }}
            >
                <Button onClick={onLoadMore}>
                    {chrome.i18n.getMessage("loadingMore")}
                </Button>
            </div>
        ) : null;

    const handleDelete = async (item: HistoryItem) => {
        await chrome.history.deleteUrl({ url: item.url });
        setHistory(list.filter((i) => i.id !== item.id));
    };

    return (
        <List
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <a href={item.url} target="_blank">
                    <List.Item
                        className={styles["history-item"]}
                        extra={
                            <>
                                <div
                                    className={styles["history-item-extra"]}
                                    style={{ padding: 8 }}
                                >
                                    {item.time}
                                </div>
                                <div
                                    className={styles["history-item-icon"]}
                                    style={{ padding: 8 }}
                                    onClick={(e) => {
                                        handleDelete(item);
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                >
                                    <CloseCircleFilled />
                                </div>
                            </>
                        }
                    >
                        <Skeleton
                            avatar
                            title={false}
                            loading={item.loading}
                            active
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.icon}>
                                        {item.title?.slice(0, 5)}
                                    </Avatar>
                                }
                                title={item.title}
                                description={
                                    <Typography.Text
                                        ellipsis={{
                                            tooltip: item.url,
                                        }}
                                        style={{
                                            color: "var(--ant-color-text-description)",
                                        }}
                                    >
                                        {item.url}
                                    </Typography.Text>
                                }
                            />
                        </Skeleton>
                    </List.Item>
                </a>
            )}
        />
    );
};

export default History;
