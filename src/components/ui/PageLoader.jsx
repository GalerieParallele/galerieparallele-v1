import BigSpinner from "@/components/ui/BigSpinner";

export default function PageLoader() {
    return <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--black)",
        color: "var(--white)"
    }}>
        <BigSpinner/>
    </div>;
}