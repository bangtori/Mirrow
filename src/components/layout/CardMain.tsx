export default function CardMain({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto w-full max-w-4xl my-15 border border-border bg-bg rounded-3xl">
            {children}
        </main>
    );
}
