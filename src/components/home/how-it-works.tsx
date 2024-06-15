import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";

const HowItWorks = function () {
  return (
    <section className="relative py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-base md:text-lg font-semibold text-neutral-500">It&apos;s important to know</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold">How it works</h2>
          <p className="mt-5 text-neutral-50">Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-14 gap-10 items-center">
          <Accordion type="single" className="w-full">
            <AccordionItem value="how-it-works-1" >
                <AccordionTrigger className="text-base md:text-lg">Pick a course</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-it-works-2">
                <AccordionTrigger className="text-base md:text-lg">Start learning, practicing and sharing</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-it-works-3">
                <AccordionTrigger className="text-base md:text-lg">Get blockchain-verified cetificate</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.
                </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="w-full h-96 bg-neutral-700"></div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;
