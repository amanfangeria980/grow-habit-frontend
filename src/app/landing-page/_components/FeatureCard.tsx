import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface FeatureCardProps {
    icon: LucideIcon | IconType;
    title: string;
    description: string;
    index: number;
}

const FeatureCard = ({
    icon: Icon,
    title,
    description,
    index,
}: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -12 }}
            whileTap={{ scale: 0.98, y: -2 }}
            className="bg-[hsl(229,84%,5%)] rounded-2xl p-6 flex flex-col items-center text-center group relative overflow-hidden border-2 border-[hsl(229,50%,20%)] hover:border-[hsl(229,50%,30%)] shadow-[0_0_15px_rgba(0,0,0,0.2),0_0_3px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3),0_0_5px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow] duration-300"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[hsl(252,100%,69%)]/40 via-transparent to-[hsl(12,90%,65%)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
            />
            <motion.div
                className="mb-6 p-3 rounded-xl bg-[hsl(12,90%,65%)]/10 relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
            >
                <Icon className="w-8 h-8 text-[hsl(12,90%,65%)]" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 text-[hsl(210,40%,98%)] relative">
                {title}
            </h3>
            <p className="text-[hsl(217.9,10.6%,64.9%)] leading-relaxed relative">
                {description}
            </p>
        </motion.div>
    );
};

export default FeatureCard;
