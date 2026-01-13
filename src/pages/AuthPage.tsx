export const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-[var(--color-gray-100)] p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[var(--color-gray-700)] mb-4">
          Авторизация через Telegram
        </h2>

        <p className="text-center text-[var(--color-gray-500)] mb-6 max-w-xs">
          Для входа в приложение откройте его через Telegram-бота. Если вы видите это сообщение,
          скорее всего, приложение запущено вне Telegram и не может получить ваши данные.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-2 rounded-lg bg-[var(--color-blue-500)] text-white font-semibold text-base shadow hover:bg-[var(--color-blue-600)] transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
};
