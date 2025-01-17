"use client";
import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const carouselImages = [
    {
        src: "/signup/i1.png",
        alt: "Illustration 1",
    },
    {
        src: "/signup/i2.png",
        alt: "Illustration 2",
    },
    {
        src: "/signup/i3.png",
        alt: "Illustration 3",
    },
];

export function SignupCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-md"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                        <div>
                            <Card className="border-0 shadow-none">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-contain"
                                            priority={index === 0}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious /> */}
            {/* <CarouselNext /> */}
        </Carousel>
    );
}
