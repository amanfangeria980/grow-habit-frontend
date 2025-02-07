import {
    Users,
    Brain,
    Bell,
    Layers,
    Trophy,
    Rocket,
    Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import ExampleTextScroll from "@/components/infiniteTextScroll/example";
import { FaWhatsapp } from "react-icons/fa";

const features = [
    {
        icon: Bell,
        title: "Never Miss Two Days",
        description:
            "Our unique system ensures you stay consistent with your habits.",
    },
    {
        icon: Trophy,
        title: "Smart Accountability",
        description:
            "Set meaningful stakes to keep yourself committed to your goals.",
    },
    {
        icon: Heart,
        title: "Comrade System",
        description:
            "Partner with someone who shares your commitment to growth.",
    },
    {
        icon: Brain,
        title: "Guided Reflection",
        description:
            "Regular check-ins help you understand and improve your habits.",
    },
    {
        icon: FaWhatsapp,
        title: "Whatsapp Reminders",
        description:
            "Stay on track with daily reminders to keep you consistent.",
    },
    {
        icon: Layers,
        title: "Customizable Goals",
        description:
            "Set Gateway, Plus, and Elite levels to progressively challenge yourself.",
    },
    {
        icon: Users,
        title: "Community Support",
        description:
            "Join a vibrant community of like-minded individuals pursuing growth.",
    },
    {
        icon: Rocket,
        title: "25-Day Challenge",
        description:
            "Transform your life with focused monthly challenges to build lasting habits.",
    },
];

const FeaturesComponent = () => {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen py-20 px-4 md:px-6 overflow-hidden">
            <Image
                src="/landingBg.jpg"
                alt="landingBg"
                className="absolute inset-0 w-full h-full object-cover [transform:scale(1,-1)] md:[transform:scale(1,-1)]"
                width={1000}
                height={1000}
                priority={false}
            />
            <div className="absolute inset-0 w-full h-full bg-black/20 z-10">
                <ExampleTextScroll />
            </div>

            <div className="relative max-w-7xl w-full z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(252,100%,69%)] to-[hsl(12,90%,65%)] bg-clip-text text-transparent relative">
                        Why Choose Grow Habit?
                        <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-[hsl(252,100%,69%)]/20 to-[hsl(12,90%,65%)]/20 blur-lg opacity-0"
                            animate={{
                                opacity: [0, 1, 0],
                                transition: { duration: 2, repeat: Infinity },
                            }}
                        />
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesComponent;
