import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IModule } from "@/db/models/Module"
import { Check } from "lucide-react"
import { ReactNode } from "react"

interface ComponentProps {
  module: IModule,
  lecturesAndExercises: ReactNode[]
}

const ModuleCollapsiblePanel = ({
  module,
  lecturesAndExercises
}: ComponentProps) => {
  return (
    <AccordionItem value={`module-${module._id}`} >
      <AccordionTrigger className="text-base md:text-lg"><span className="flex items-center gap-2">{`${module.order}. ${module.name}`} {module.isCompleted && <Check size={20} />}</span></AccordionTrigger>
      <AccordionContent className="text-neutral-400 text-base md:text-lg bg-neutral-900 p-5 rounded-md mb-5">
        {module.content}
        {module.lectures?.length &&
          <Table className="mt-4 text-base">
            <TableBody>
              {lecturesAndExercises}
            </TableBody>
          </Table>}
      </AccordionContent>
    </AccordionItem>
  )
}

export default ModuleCollapsiblePanel