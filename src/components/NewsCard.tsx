import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export interface NewsCardProps {
  id: string;
  description: string;
  title: string;
}

export const NewsCard = ({ id, description, title }: NewsCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.setItem("newsScroll", window.scrollY.toString());
    navigate(`/news/${id}`);
  };

  return (
    <Link
      className="group p-6 min-h-[120px] flex flex-col gap-3 rounded-2xl bg-[var(--tg-theme-section-bg-color,#ffffff)] border border-[var(--border-color)] shadow-lg transition-all duration-300 active:shadow-md active:translate-y-0 animate-[fadein_0.5s] no-underline"
      to={`/news/${id}`}
      onClick={handleClick}
    >
      <h3 className="text-[17px] font-semibold text-[var(--text-primary)] transition-colors duration-200 line-clamp-2">
        {title}
      </h3>
      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed line-clamp-3 flex-1">
        {description}
      </p>
      <div className="text-xs text-[var(--text-accent)] opacity-80 transition-opacity">
        {t("receiptCard.moreDetails")} →
      </div>
    </Link>
  );
};
