import Link from "next/link";

export function QuickActionCard({ action }: { action: any }) {
  return (
    <Link href={action.href} className="flex gap-4 items-center p-6 ...">
      <action.icon className="absolute ..." />
      <div className="flex items-center gap-4 relative">
        <action.icon className="..." />
        <div className="flex flex-col ...">
          <h3 className="...">{action.title}</h3>
          <p className="...">{action.description}</p>
        </div>
      </div>
    </Link>
  );
}