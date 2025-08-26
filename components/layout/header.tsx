interface IHeader {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: IHeader) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>
      <p className="text-gray-200">
        {subtitle}
      </p>
    </div>
  )
}