import Badge from '@/components/ui/Badge';

type MyPageHeaderProps = {
    count: number;
}

export default function MyPageHeader({ count }: MyPageHeaderProps) {
    return (
        <section className="flex justify-between py-10 border-b border-border">
            <h1 className="font-black text-heading-md md:text-heading-lg">내 Mirrow</h1>
            <Badge variant="accent">{count}개</Badge>
        </section>
    )
}
