export default function FilterBar({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', margin: '2em 0' }}>
            {children}
        </div>
    );
}
