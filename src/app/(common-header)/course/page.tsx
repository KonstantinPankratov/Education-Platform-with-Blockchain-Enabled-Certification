import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
      <>
        <section className="relative isolate pt-14">
          <div className="container">
            <h1 className="text-4xl sm:text-6xl">JavaScript For Beginners</h1>
            <p className="mt-6 w-3/5">Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros..</p>
            <Button asChild className="mt-8" size="lg">
              <Link href="#">Enroll</Link>
            </Button>
          </div>
        </section>

        <section className="container mt-20">
          <h2 className="text-3xl sm:text-4xl">Modules</h2>
          <div className="flex gap-3 mt-4">
            <Badge variant="outline">12 lessons</Badge>
            <Badge variant="outline">9 exercises</Badge>
          </div>
          <Accordion type="single" className="w-full mt-10" defaultValue="module-1">
            <AccordionItem value="module-1" >
                <AccordionTrigger className="text-base md:text-lg">1. Introduction</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="module-2">
                <AccordionTrigger className="text-base md:text-lg">2. Operations</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="module-3">
                <AccordionTrigger className="text-base md:text-lg">3. Variables</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base md:text-lg">
                Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-center">
            <Button asChild className="mt-8" size="lg">
              <Link href="#">Enroll</Link>
            </Button>
          </div>
        </section>
      </>
    );
  }
  