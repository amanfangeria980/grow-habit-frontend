import React from "react";

interface TextItem {
    text: string;
    highlight?: boolean;
}

interface InfiniteTextScrollProps {
    items: TextItem[];
    className?: string;
    speed?: number; // in seconds
    direction?: "left" | "right";
}

const InfiniteTextScroll: React.FC<InfiniteTextScrollProps> = ({
    items,
    className = "",
    speed = 20,
    direction = "left",
}) => {
    return (
        <div className={`w-full overflow-hidden ${className}`}>
            <div
                className="relative whitespace-nowrap"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 95%)",
                }}
            >
                <div
                    className={`inline-flex flex-nowrap gap-6 animate-text-scroll-horizontal`}
                    style={{
                        animationDuration: `${speed}s`,
                        animationDirection:
                            direction === "right" ? "reverse" : "normal",
                    }}
                >
                    {/* Repeat the items three times to create a seamless loop */}
                    {[...items, ...items, ...items].map((item, itemIndex) => (
                        <p
                            key={itemIndex}
                            className={`inline-block text-lg font-medium transition-colors ${
                                item.highlight
                                    ? "text-orange-500 dark:text-orange-400"
                                    : "text-gray-600 dark:text-gray-300"
                            }`}
                        >
                            {item.text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfiniteTextScroll;
