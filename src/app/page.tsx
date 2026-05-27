import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 ">
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
      </main>
    </div>
  );
}
