import { Link } from "react-router-dom";

export interface NewsCardProps {
  id: string;
  description: string;
  title: string;
}

export const NewsCard = ({ id, description, title }: NewsCardProps) => {
  return (
    <Link
      className="group p-6 min-h-[120px] flex flex-col gap-3 rounded-2xl bg-white border border-[var(--color-gray-100)] shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:shadow-md active:translate-y-0 animate-[fadein_0.5s] no-underline"
      to={`/news/${id}`}
    >
      <h3 className="text-[17px] font-semibold text-[var(--color-blue-800)] group-hover:text-[var(--color-red-200)] transition-colors duration-200 line-clamp-2">
        {title}
      </h3>
      <p className="text-[14px] text-[var(--color-gray-400)] leading-relaxed line-clamp-3 flex-1">
        {description}
      </p>
      <div className="text-xs text-[var(--color-gray-300)] group-hover:text-[var(--color-gray-400)] transition-colors">
        Подробнее →
      </div>
    </Link>
  );
};
