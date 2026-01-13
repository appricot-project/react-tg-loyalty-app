import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReceiptCard } from "@/components/ReceiptCard/ReceiptCard";
import { useReceipts } from "@/hooks/useReceipts";
import { useReceiptsInfinite } from "@/hooks/useReceiptsInfinite";
import type { Receipt } from "@/types";
import { ReceiptStatus, RECEIPT_STATUS_LABELS } from "@/types";
import { useAppSelector } from "@/store/hooks";

type FilterStatus = "all" | ReceiptStatus;

const FILTER_OPTIONS: { key: FilterStatus; label: string }[] = [
  { key: "all", label: "Все" },
  { key: ReceiptStatus.PENDING, label: RECEIPT_STATUS_LABELS[ReceiptStatus.PENDING] },
  { key: ReceiptStatus.APPROVED, label: RECEIPT_STATUS_LABELS[ReceiptStatus.APPROVED] },
  { key: ReceiptStatus.REJECTED, label: RECEIPT_STATUS_LABELS[ReceiptStatus.REJECTED] },
];

export const HistoryPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { allReceipts } = useReceipts();
  const [filter, setFilter] = useState<FilterStatus>("all");

  // Сброс данных
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(loadReceipts(mockReceipts));
  // }, [dispatch]);
  // useEffect(() => {
  //   localStorage.removeItem("persist:receipts");
  //   window.location.reload();
  // }, []);

  const { receipts, isLoading, hasMore, error, loader } = useReceiptsInfinite(filter);

  const stats = [
    { label: "Всего", value: allReceipts.length },
    {
      label: "Принято",
      value: allReceipts.filter((receipt: Receipt) => receipt.status === ReceiptStatus.APPROVED)
        .length,
    },
    {
      label: "Отклонено",
      value: allReceipts.filter((receipt: Receipt) => receipt.status === ReceiptStatus.REJECTED)
        .length,
    },
    {
      label: "Обрабатывается",
      value: allReceipts.filter((receipt: Receipt) => receipt.status === ReceiptStatus.PENDING)
        .length,
    },
  ];

  const showSkeletons = !error && receipts.length === 0 && isLoading;
  const showLoader = receipts.length > 0 && !error && hasMore;

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  console.log(receipts);

  return (
    <div className="mt-4 pt-4 px-4">
      <h1 className="text-2xl font-bold text-[var(--color-gray-1000)] mb-6">История чеков</h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white border border-[var(--color-gray-100)] p-4"
          >
            <p className="text-xs text-[var(--color-gray-400)] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--color-blue-800)]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-2xl bg-white border border-[var(--color-gray-100)] p-4">
        <p className="text-sm font-semibold text-[var(--color-gray-700)] mb-3">Фильтр по статусу</p>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <button
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                filter === option.key
                  ? "bg-[var(--color-blue-800)] text-white"
                  : "bg-[var(--color-gray-100)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-200)]"
              }`}
              key={option.key}
              type="button"
              onClick={() => setFilter(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pb-6">
        {error && (
          <div className="rounded-2xl bg-white border border-[var(--color-gray-100)] p-6 text-center">
            <h3 className="text-lg font-semibold text-[var(--color-red-200)] mb-2">Ошибка</h3>
            <p className="text-[var(--color-gray-400)]">{error}</p>
          </div>
        )}

        {showSkeletons && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map(() => {
              const uniqueKey = `skeleton-${Math.random().toString(36).substr(2, 9)}`;
              return (
                <div
                  key={uniqueKey}
                  className="h-[100px] rounded-2xl bg-[var(--color-gray-800)] animate-[fadein_0.5s]"
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
          <div className="rounded-2xl bg-white border border-[var(--color-gray-100)] p-8 text-center">
            <p className="text-[var(--color-gray-400)]">Чеки не найдены</p>
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
