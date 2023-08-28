import BigSpinner from "@/components/items/BigSpinner";

export default function PageLoader() {
    return <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <BigSpinner/>
    </div>;
}