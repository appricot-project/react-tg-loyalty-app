import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ReceiptCard } from "@/components/ReceiptCard/ReceiptCard";
import { useReceipts } from "@/hooks/useReceipts";
import { useReceiptsInfinite } from "@/hooks/useReceiptsInfinite";
import type { Receipt } from "@/types";
import { ReceiptStatus } from "@/types";
import { useAppSelector } from "@/store/hooks";

type FilterStatus = "all" | ReceiptStatus;

const FILTER_OPTIONS: { key: FilterStatus; labelKey: string }[] = [
  { key: "all", labelKey: "history.all" },
  { key: ReceiptStatus.PENDING, labelKey: "receiptStatus.pending" },
  { key: ReceiptStatus.APPROVED, labelKey: "receiptStatus.approved" },
  { key: ReceiptStatus.REJECTED, labelKey: "receiptStatus.rejected" },
];

export const HistoryPage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { allReceipts } = useReceipts();
  const [filter, setFilter] = useState<FilterStatus>("all");

  // // Сброс данных
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(loadReceipts(mockReceipts));
  // }, [dispatch]);
  // useEffect(() => {
  //   localStorage.removeItem("persist:receipts");
  //   localStorage.removeItem("persist:user");
  //   // localStorage.clear();
  //   window.location.reload();
  // }, []);

  const { receipts, isLoading, hasMore, error, loader } = useReceiptsInfinite(filter);

  const stats = [
    { label: t("history.all"), value: allReceipts.length },
    {
      label: t("receiptStatus.pending"),
      value: allReceipts.filter((receipt: Receipt) => receipt.status === ReceiptStatus.PENDING)
        .length,
    },
    {
      label: t("receiptStatus.approved"),
      value: allReceipts.filter((receipt: Receipt) => receipt.status === ReceiptStatus.APPROVED)
        .length,
    },
    {
      label: t("receiptStatus.rejected"),
      value: allReceipts.filter((receipt: Receipt) => receipt.status === ReceiptStatus.REJECTED)
        .length,
    },
  ];

  const showSkeletons = !error && receipts.length === 0 && isLoading;
  const showLoader = receipts.length > 0 && !error && hasMore;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="mt-4 pt-4 px-4">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t("history.title")}</h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-4 shadow-lg"
          >
            <p className="text-xs text-[var(--color-gray-400)] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--text-accent)]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-4 shadow-lg">
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">
          {t("history.filter")}
        </p>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => {
            console.log(t(option.labelKey));

            return (
              <button
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  filter === option.key
                    ? "bg-[var(--text-accent)] text-white"
                    : "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]"
                }`}
                key={option.key}
                type="button"
                onClick={() => setFilter(option.key)}
              >
                {t(option.labelKey)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pb-6">
        {error && (
          <div className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 text-center shadow-lg">
            <h3 className="text-lg font-semibold text-[var(--color-red-200)] mb-2">
              {t("error.title")}
            </h3>
            <p className="text-[var(--color-gray-400)]">{t(error)}</p>
          </div>
        )}

        {showSkeletons && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map(() => {
              const uniqueKey = `skeleton-${Math.random().toString(36).substr(2, 9)}`;
              return (
                <div
                  key={uniqueKey}
                  className="h-[100px] rounded-2xl bg-[var(--bg-primary)] animate-[fadein_0.5s] border border-[var(--border-color)]"
                />
              );
            })}
          </div>
        )}

        {!error && (
          <div className="flex flex-col gap-3">
            {receipts.map((receipt: Receipt) => (
              <div key={receipt.id} className="animate-[fadein_0.5s]">
                <ReceiptCard receipt={receipt} />
              </div>
            ))}
          </div>
        )}

        {receipts.length === 0 && !isLoading && !error && (
          <div className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-8 text-center shadow-lg">
            <p className="text-[var(--color-gray-400)]">{t("history.noReceipts")}</p>
          </div>
        )}

        {showLoader && (
          <div className="flex justify-center my-6">
            <Spinner size="l" />
          </div>
        )}
        {hasMore && !error && <div ref={loader} className="h-1" />}
      </div>
    </div>
  );
};
