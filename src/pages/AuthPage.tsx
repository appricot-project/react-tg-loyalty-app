export const AuthPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <h2>Авторизация через Telegram</h2>

      <p style={{ maxWidth: 320, textAlign: "center", marginBottom: 24 }}>
        Для входа в приложение откройте его через Telegram-бота. Если вы видите это сообщение,
        скорее всего, приложение запущено вне Telegram и не может получить ваши данные.
      </p>

      <button
        style={{ padding: "10px 24px", fontSize: 16 }}
        type="button"
        onClick={() => window.location.reload()}
      >
        Попробовать снова
      </button>
    </div>
  );
};
