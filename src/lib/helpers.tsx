import CodeSnippet from "@/components/ui/code-snippet"
import parse from "html-react-parser"
import sanitizeHtml from "sanitize-html"

export function getCoursePartLink({ courseSlug, lectureSlug, exerciseSlug }: { courseSlug: string, lectureSlug?: string, exerciseSlug?: string }): string {
  if (lectureSlug) {
    return `/course/${courseSlug}/lecture/${lectureSlug}`
  }

  if (exerciseSlug) {
    return `/course/${courseSlug}/exercise/${exerciseSlug}`
  }

  return `/course/${courseSlug}`
}

export const createInitials = (name: string) => {
  const words = name.split(' ')
  const initials = words.map(word => word[0].toUpperCase())
  return initials.join('')
}

export const unescapeLineBreaks = (str: string) => {
  return str.replace(/\\n/g, '\n').replace(/\\r\\n/g, '\r\n')
}

export const sanitizeContent = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ "img", "h2", "h3", "p", "code" ]),
    allowedAttributes: {
        "*": ["style", "class"],
        "a": [ "href", "name", "target" ],
        "img": [ "src" ],
    }
  })
}

export const parseContent = (html: string) => {
  return parse(html, {
    replace: (domNode: any) => {
      if (domNode.name === "code") {
        const codeText = domNode.children.map((child: any) => unescapeLineBreaks(child.data)).join('')
        return <CodeSnippet>{ codeText }</CodeSnippet>
      }
    },
  })
}
