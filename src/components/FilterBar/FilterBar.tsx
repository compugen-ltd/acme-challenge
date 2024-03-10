export default function FilterBar({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2em 0', gap: "2em" }}>
            {children}
        </div>
    );
}
