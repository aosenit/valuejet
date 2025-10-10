import React from "react";

interface OverviewCard {
  title: string;
  value: string;
  change: string;
  color: string;
  icon: React.ElementType;
  iconStyle: string;
  percentColor: string;
  bg: string;
}

interface OverviewCardsProps {
  cards: OverviewCard[];
}

export default function OverviewCards({ cards }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => {
        // Split change into first word (+10.2%) and rest
        const [percent, ...rest] = card.change.split(" ");
        return (
          <div
            key={index}
            className={`rounded-lg p-4 flex items-center justify-center ${card.color} ${card.bg}`}
          >
            <div className="rounded-lg flex flex-col w-full">
              <span className="text-sm text-gray-500">{card.title}</span>
              <span className="text-2xl font-semibold">{card.value}</span>
              <span className="mt-2 text-xs">
                <span className={`${card.percentColor} font-medium`}>
                  {percent}
                </span>{" "}
                {rest.join(" ")}
              </span>
            </div>
            <span
              className={`p-2 rounded-md ${card.iconStyle} flex items-center justify-center`}
            >
              <card.icon size={20} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
