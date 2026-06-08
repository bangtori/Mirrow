import CardMain from "@/components/layout/CardMain";

export default function WithoutFooterLayout({ children }: { children: React.ReactNode }) {
    return (
        <CardMain>{children}</CardMain>
    )
}
