import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CodeHighlighter } from "@/lib/helpers"

const Post: React.FC = async () => {
  const code = `const numbers = [45, 4, 9, 16, 25];\n\nlet txt = "";\n\nnumbers.forEach(myFunction);\n\nfunction myFunction(value) {\n  // Complete this function ...\n}`
  const parsedCode = await CodeHighlighter(code)
  return (
    <article className="flex flex-col gap-y-3">
      <div className="flex gap-x-4 items-center">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/30325297?v=4" alt="@KonstantinPankratov" />
          <AvatarFallback>KP</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-1">
          <span className="font-bold text-lg">Konstantin P.</span>
          <span className="font-semibold text-sm text-neutral-400">27 May, 2024</span>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur. In vulputate sit aliquam donec imperdiet mauris. Quam proin libero aliquet nulla. Massa placerat pretium commodo laoreet. Duis curabitur turpis in gravida massa nunc iaculis sed. Viverra sem purus tellus commodo sit.</p>
      <div dangerouslySetInnerHTML={{ __html: parsedCode }}></div>
      <ToggleGroup type="single" className="justify-normal">
        <ToggleGroupItem value="a">⚡ 7</ToggleGroupItem>
        <ToggleGroupItem value="b">💡 3</ToggleGroupItem>
        <ToggleGroupItem value="c">🔥 13</ToggleGroupItem>
      </ToggleGroup>
    </article>
  )
}

export default Post