"use client";

import { BackgroundBeamsWithCollision } from "@/components/backgroundBeamsCollision/background-beams-with-collision";
import Image from "next/image";
import { motion } from "framer-motion";
import SwipeButton from "@/components/swipeButton/swipeButton";
import ExampleTextScroll from "@/components/infiniteTextScroll/example";

const activityImages = {
    cycling:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Woman%20Mountain%20Biking%20Medium-Light%20Skin%20Tone.png",
    basketball:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Woman%20Bouncing%20Ball%20Medium-Light%20Skin%20Tone.png",
    running:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Woman%20Running%20Light%20Skin%20Tone.png",
    swimming:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Woman%20Swimming%20Medium-Light%20Skin%20Tone.png",
};

export default function LandingPage() {
    const randomActivity = Math.random() < 0.5 ? "cycling" : "basketball";
    const randomTopActivity = Math.random() < 0.5 ? "running" : "swimming";

    return (
        <>
            <div className="relative">
                <Image
                    src={"/landingBg.jpg"}
                    alt="landingBg"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1000}
                    height={1000}
                    priority={true}
                />
                <BackgroundBeamsWithCollision>
                    <div className="flex flex-col items-center justify-center text-center px-4 ">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] sm:top-40 top-40 sm:right-20 right-4 scale-x-[-1]"
                        >
                            <Image
                                src={activityImages[randomTopActivity]}
                                alt={
                                    randomTopActivity === "running"
                                        ? "Woman Running"
                                        : "Woman Swimming"
                                }
                                width="150"
                                height="150"
                                className="w-full h-full"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] sm:top-40 sm:left-20 left-4 top-40"
                        >
                            <Image
                                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Technologist.png"
                                alt="Man Working"
                                width="150"
                                height="150"
                                className="w-full h-full"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute mx-auto inset-x-0 flex justify-center sm:w-[150px] sm:h-[150px] w-[120px] h-[120px] sm:top-20 top-4"
                        >
                            <Image
                                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Lifting%20Weights.png"
                                alt="Person Lifting Weights"
                                width="150"
                                height="150"
                                className="w-full h-full"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] sm:bottom-40 bottom-10 sm:right-40 right-4"
                        >
                            <Image
                                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20in%20Lotus%20Position.png"
                                alt="Man in Lotus Position"
                                width="150"
                                height="150"
                                className="w-full h-full"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] sm:bottom-40 bottom-10 sm:left-40 left-4 scale-x-[-1]"
                        >
                            <Image
                                src={activityImages[randomActivity]}
                                alt={
                                    randomActivity === "cycling"
                                        ? "Woman Mountain Biking"
                                        : "Woman Bouncing Ball"
                                }
                                width="150"
                                height="150"
                                className="w-full h-full"
                            />
                        </motion.div>
                        <motion.h1
                            className="text-5xl sm:text-6xl font-bold mb-2 text-white flex flex-col gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Transform Your Life,{" "}
                            <motion.span
                                className="text-orange-500 block"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                One Habit at a Time
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-white text-xl mb-8 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Join our next 25-day challenge and build lasting
                            habits with accountability and support.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="relative hover:cursor-pointer"
                        >
                            <SwipeButton
                                firstText="Join Next Month's Challenge &nbsp; &nbsp;"
                                secondText="Join Next Month's Challenge &nbsp; &nbsp;"
                                className="text-lg font-medium max-w-fit"
                                firstClass="bg-orange-500 text-white px-8 py-3"
                                secondClass="bg-indigo-600 text-white px-8 py-3"
                            />
                            <Image
                                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png"
                                alt="Beaming Face with Smiling Eyes"
                                width="30"
                                height="30"
                                className="absolute sm:bottom-3 bottom-2.5 sm:right-3 right-2.5"
                            />
                        </motion.div>
                    </div>
                </BackgroundBeamsWithCollision>
            </div>

            <div className="w-full mt-2">
                <ExampleTextScroll />
            </div>
        </>
    );
}
