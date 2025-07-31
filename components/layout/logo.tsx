import Image from "next/image";

export default function Logo() {

  return (
    <div className="flex items-center gap-3 shrink-0">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={74}
        height={74}
        className="h-10 w-auto"
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-white">Semensol</h1>
      </div>
    </div>
  )
}