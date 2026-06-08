import Footer from "@/components/layout/Footer";
import CardMain from "@/components/layout/CardMain";

export default function WithFooterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CardMain>{children}</CardMain>
            <Footer />
        </>
    )
}