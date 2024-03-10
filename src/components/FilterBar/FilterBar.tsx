export default function FilterBar({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'safe left', marginLeft: '1em', marginTop: '2em', marginBottom: '2em', gap: '1em' }}>
            {children}
        </div>
    );
}
