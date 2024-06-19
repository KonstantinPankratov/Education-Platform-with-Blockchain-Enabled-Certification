"use client"

import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Image from "next/image"
import Link from "next/link"
import CodeEditor from "@/components/ui/code-editor"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Post from "@/components/practice/post"

export default function Page() {
  return (
    <ResizablePanelGroup
      direction="horizontal">
      <ResizablePanel defaultSize={45} minSize={20} className="p-6 pt-3 flex"> {/* left */}
        <Tabs defaultValue="Description" className="w-full flex flex-col items-start">
          <TabsList>
            <TabsTrigger value="Description">Description</TabsTrigger>
            <TabsTrigger value="Discussion">Discussion (23)</TabsTrigger>
          </TabsList>
          <TabsContent value="Description" className="w-full overflow-auto pr-5"> {/* TODO */}
            <h1 className="text-3xl sm:text-4xl mt-8 mb-5">1. Introduction</h1>
            <div className="flex flex-col gap-y-5">
              <p>Lorem ipsum dolor sit amet consectetur. In vulputate sit aliquam donec imperdiet mauris. Quam proin libero aliquet nulla. Massa placerat pretium commodo laoreet. Duis curabitur turpis in gravida massa nunc iaculis sed. Viverra sem purus tellus commodo sit. Nunc at ut molestie a maecenas adipiscing scelerisque feugiat ipsum. Proin sed et imperdiet et tempor id leo in aliquet. Facilisi vitae leo nisl ut enim sed faucibus. Eu senectus urna in orci consequat fermentum vel non. Sit duis varius enim lacus. Facilisis at egestas amet interdum. Tincidunt nam tristique bibendum aliquam. Nulla neque ante non diam enim sed.</p>
              <Image src="https://www.w3docs.com/uploads/media/default/0001/05/4482fe09d95a0be765154b9cefff5e07f7fc32ff.png" width="768" height="299" alt=""/>
              <p>Ultrices tortor non vulputate posuere. Pellentesque pulvinar eget ac vel pretium turpis imperdiet. Pellentesque quis mollis non pellentesque a. Sollicitudin lorem nisl nulla at turpis congue ut sed euismod. Commodo viverra elit vulputate aliquet. Varius risus sit tempor vel volutpat platea nisl egestas. Nisl dignissim tempus molestie condimentum sed amet. Scelerisque scelerisque eget sed aliquet congue rutrum. Viverra bibendum viverra nec lacus libero elementum eget ac. Arcu quis feugiat amet aliquam suscipit quisque. In nec aliquam tellus congue. Donec odio cursus nunc quam dolor.</p>
              <p>Enim elit euismod in nisi senectus in dui proin. Lectus vestibulum cursus sed eget purus cum augue pellentesque. Purus lectus aliquam condimentum integer cras in penatibus amet. Nibh tortor augue purus sed sit posuere ut velit. Ligula faucibus posuere dui sed blandit pellentesque a bibendum neque. Magna proin pharetra sollicitudin ornare nunc.</p>
              <p>Vitae euismod phasellus proin quis facilisis leo pellentesque augue sodales. Nibh mi sit tempor tempor fames at dolor malesuada. A elit in lacus varius. Integer et aliquam elementum integer. Sit nisl quisque scelerisque leo malesuada neque imperdiet nunc eget. Non vitae purus aliquam neque viverra aliquet dui. Pellentesque vehicula rhoncus eleifend diam gravida ut sed pharetra ut. Libero dolor leo turpis vulputate bibendum et quis. Iaculis semper tortor non a enim magna. Nec consectetur lectus non felis. Odio arcu accumsan tellus convallis volutpat lacus nunc. Eu dui viverra mattis tortor maecenas. Egestas duis amet augue mi arcu fermentum. In augue enim egestas fermentum nulla fermentum lacus. Porta gravida turpis a neque at porttitor orci justo quisque.</p>
              <p>Auctor et sagittis diam scelerisque in vitae feugiat. Placerat arcu sit ornare potenti nunc nisl. Urna tincidunt ornare nunc luctus nullam nec sagittis scelerisque. Lacus quis aliquet lorem non quis aliquet purus in phasellus. Nibh a condimentum amet tempor egestas congue. Eget semper interdum viverra arcu. Lorem eu diam nullam felis pharetra ut id eget gravida. Sollicitudin lectus velit urna id hendrerit lorem gravida purus aliquam. Tellus egestas elementum tincidunt non elementum. Est odio nibh ut dui quisque dui elit euismod. Consectetur duis in laoreet suscipit.</p>
              <p>Auctor et sagittis diam scelerisque in vitae feugiat. Placerat arcu sit ornare potenti nunc nisl. Urna tincidunt ornare nunc luctus nullam nec sagittis scelerisque. Lacus quis aliquet lorem non quis aliquet purus in phasellus. Nibh a condimentum amet tempor egestas congue. Eget semper interdum viverra arcu. Lorem eu diam nullam felis pharetra ut id eget gravida. Sollicitudin lectus velit urna id hendrerit lorem gravida purus aliquam. Tellus egestas elementum tincidunt non elementum. Est odio nibh ut dui quisque dui elit euismod. Consectetur duis in laoreet suscipit.</p>
              <p>Auctor et sagittis diam scelerisque in vitae feugiat. Placerat arcu sit ornare potenti nunc nisl. Urna tincidunt ornare nunc luctus nullam nec sagittis scelerisque. Lacus quis aliquet lorem non quis aliquet purus in phasellus. Nibh a condimentum amet tempor egestas congue. Eget semper interdum viverra arcu. Lorem eu diam nullam felis pharetra ut id eget gravida. Sollicitudin lectus velit urna id hendrerit lorem gravida purus aliquam. Tellus egestas elementum tincidunt non elementum. Est odio nibh ut dui quisque dui elit euismod. Consectetur duis in laoreet suscipit.</p>
            </div>
            <p className="border py-2 px-3 mt-4 rounded-sm text-base">Is there anything unclear? Feel free to <Link href="#" className="underline underline-offset-2 hover:text-primary">go back to the theory</Link>.</p>
          </TabsContent>
          <TabsContent value="Discussion" className="w-full overflow-auto pr-5">
            <div className="flex flex-col gap-y-10 mt-8">
              <Post/>
              <Post/>
            </div>
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55} minSize={20} className="p-6 pt-3"> {/* right */}
        <ResizablePanelGroup
          direction="vertical"
          className="right">
          <ResizablePanel defaultSize={75} minSize={30} className="flex flex-col"> {/* editor */}
            <div className="flex justify-between items-center gap-x-5 mb-3">
              <Badge variant="outline">Code</Badge>
              <TooltipProvider>
                <Tooltip defaultOpen={true}>
                  <Button asChild>
                    <TooltipTrigger>Test <Play className="w-3.5 ml-2" strokeWidth="3"/></TooltipTrigger>
                  </Button>
                  <TooltipContent className="font-semibold text-[11px]" sideOffset={10} side="left">
                    CTRL + ENTER {/* TODO */}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CodeEditor></CodeEditor>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={10} className="pt-3 flex flex-col"> {/* output */}
            <div>
              <Badge variant="outline">Tests</Badge>
            </div>
            <div className="rounded-md w-full flex-grow mt-3 bg-[#1e1e1e]"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
