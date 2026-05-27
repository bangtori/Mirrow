import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-col gap-10">
        <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">Buttons</h2>
        <div className="flex gap-3">
          <Button variant="primary">Button</Button>
          <Button variant="primary" appearance="outline">Button</Button>
          <Button variant="primary" appearance="ghost">Button</Button>
        </div>
        <div className="flex gap-3">
          <Button variant="danger">Button</Button>
          <Button variant="danger" appearance="outline">Button</Button>
          <Button variant="danger" appearance="ghost">Button</Button>
        </div>
        <div className="flex gap-3">
          <Button size="sm">Button</Button>
          <Button size="md">Button</Button>
          <Button size="lg">Button</Button>
        </div>
       </section>
       <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">Badges</h2>
        <div className="flex gap-3">
          <Badge variant="accent">accent</Badge>
          <Badge variant="muted">muted</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="warn">warn</Badge>
          <Badge variant="danger">danger</Badge>
        </div>
       </section>
      </main>
    </div>
  );
}
