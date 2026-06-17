export default function CardMain({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto w-full md:max-w-4xl md:my-15 md:border md:border-border bg-bg md:rounded-3xl">
            {children}
        </main>
    );
}
