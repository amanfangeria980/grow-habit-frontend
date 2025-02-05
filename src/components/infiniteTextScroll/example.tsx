import React from "react";
import InfiniteTextScroll from "./InfiniteTextScroll";

const ExampleTextScroll: React.FC = () => {
    const items = [
        { text: "⭐️ Build lasting habits that stick ⭐️", highlight: true },
        { text: "⭐️ Transform your life ⭐️" },
        { text: "⭐️ Join our supportive community ⭐️", highlight: true },
        { text: "⭐️ Track your progress daily ⭐️" },
        { text: "⭐️ Stay accountable ⭐️", highlight: true },
        { text: "⭐️ Achieve your goals ⭐️" },
        { text: "⭐️ Create positive change ⭐️", highlight: true },
        { text: "⭐️ 25-day challenge ⭐️" },
        { text: "⭐️ Measurable results ⭐️", highlight: true },
    ];

    return (
        <InfiniteTextScroll
            items={items}
            speed={50}
            direction="left"
            className="h-full"
        />
    );
};

export default ExampleTextScroll;
