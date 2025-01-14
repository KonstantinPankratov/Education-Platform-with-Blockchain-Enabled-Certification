import { transformerCopyButton } from "@/components/code/copy-code-button-transformer"
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

export const unescapeSpecialCodeCharacters = (str: string) => {
  return str.replace(/\\n/g, '\n').replace(/\\r\\n/g, '\r\n').replace(/&amp;/g, '&').replace(/&gte;/g, '>=').replace(/&lte;/g, '<=').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
}

export const sanitizeContent = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      "*": ['style', 'class'],
      "img": ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    },
    allowedClasses: {
      'code': ['language-*', 'highlight'],
    }
  })
}

export const CodeHighlighterParser = async (html: string, lang: string = 'javascript', theme: string = 'dark-plus') => {
  const { createHighlighter } = await import('shiki')

  const highlighter = await createHighlighter({
    langs: [lang],
    themes: [theme]
  })

  const response = html.replace(
    /<code class="highlight">([\s\S]*?)<\/code>/g,
    (match, code) => {
      const highlightedCode = highlighter.codeToHtml(unescapeSpecialCodeCharacters(code.trim()), {
        lang: lang,
        theme: theme,
        transformers: [
          transformerCopyButton({
            visibility: 'always',
            feedbackDuration: 1_000,
          })
        ]
      })
      return highlightedCode
    }
  )

  highlighter.dispose()

  return response
}

export const CodeHighlighter = async (code: string, lang: string = 'javascript', theme: string = 'dark-plus') => {
  const { codeToHtml } = await import('shiki')

  return codeToHtml(unescapeSpecialCodeCharacters(code), {
    lang: lang,
    theme: theme
  })
}