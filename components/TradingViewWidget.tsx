"use client";

import React, { memo } from "react";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import {cn} from "@/lib/utils";

interface TradingViewWidgetProps {
    title: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}

const TradingViewWidget = ({title, scriptUrl, config, height = 600, className,}: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, height);

    return (
        <div className="w-full">
            {title && (
                <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
            )}

                <div className={cn('tradingview-widget-container__widget', className)} ref={containerRef}></div>
                    <div className={`tradingview-widget-container ${className || ""}`} ref={containerRef} style={{ height, width: "100%" }}/>

        </div>
    );
};

export default memo(TradingViewWidget);
