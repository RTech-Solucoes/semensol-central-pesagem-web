export default function SettingsCard() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl text-gray-400">⚙️</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Funcionalidade em Desenvolvimento
        </h2>
        <p className="text-gray-500">
          As configurações do sistema estarão disponíveis em breve.
        </p>
      </div>
    </div>
  );
}