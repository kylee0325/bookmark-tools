import { useState } from "react";

function Options() {
    const [data, setData] = useState("");

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16,
            }}
        >
            <h1>opt</h1>
            <input onChange={(e) => setData(e.target.value)} value={data} />
        </div>
    );
}

export default Options;
