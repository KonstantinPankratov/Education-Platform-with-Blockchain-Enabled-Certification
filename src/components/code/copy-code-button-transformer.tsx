import type { ShikiTransformer } from 'shiki';

interface CopyButtonOptions {
  feedbackDuration?: number;
  copyIcon?: string;
  successIcon?: string;
  visibility?: 'hover' | 'always';
}

const WHITESPACE_REGEX = /\s*\n\s*/g;

export const trimWhitespace = (input: string) =>
  input.replaceAll(WHITESPACE_REGEX, '').trim();


export function transformerCopyButton(
  options: CopyButtonOptions = {
    visibility: 'hover',
    feedbackDuration: 3_000,
  },
): ShikiTransformer {
  return {
    name: 'copy-code-button-tranformer',
    code(node) {
      node.children.push({
        type: 'element',
        tagName: 'button',
        properties: {
          type: 'button',
          data: this.source,
          title: 'Copy code',
          'aria-label': 'Copy code',
          class: 'copy-code',
          'data-name': 'copy-code-button',
          onclick: trimWhitespace(/* javascript */ `
            navigator.clipboard.writeText(this.attributes.data.value);
            this.classList.add('code-snipper-copied');
            window.setTimeout(() => this.classList.remove('code-snipper-copied'), ${options.feedbackDuration});
          `),
        },
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: { class: 'ready' },
            children: [],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { class: 'success' },
            children: [],
          },
        ],
      });
      node.children.push({
        type: 'element',
        tagName: 'style',
        properties: {},
        children: [
          {
            type: 'text',
            value: copyButtonStyle({
              copyIcon: options.copyIcon,
              successIcon: options.successIcon,
              visibility: options.visibility,
            }),
          },
        ],
      });
    },
  };
}

function copyButtonStyle({
  copyIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23adadad' d='M16.187 9.5H12.25a1.75 1.75 0 0 0-1.75 1.75v28.5c0 .967.784 1.75 1.75 1.75h23.5a1.75 1.75 0 0 0 1.75-1.75v-28.5a1.75 1.75 0 0 0-1.75-1.75h-3.937a4.25 4.25 0 0 1-4.063 3h-7.5a4.25 4.25 0 0 1-4.063-3M31.813 7h3.937A4.25 4.25 0 0 1 40 11.25v28.5A4.25 4.25 0 0 1 35.75 44h-23.5A4.25 4.25 0 0 1 8 39.75v-28.5A4.25 4.25 0 0 1 12.25 7h3.937a4.25 4.25 0 0 1 4.063-3h7.5a4.25 4.25 0 0 1 4.063 3M18.5 8.25c0 .966.784 1.75 1.75 1.75h7.5a1.75 1.75 0 1 0 0-3.5h-7.5a1.75 1.75 0 0 0-1.75 1.75'/%3E%3C/svg%3E",
  successIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2366ff85' d='M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41z'/%3E%3C/svg%3E",
  visibility = 'hover',
}: {
  copyIcon?: string;
  successIcon?: string;
  visibility?: 'hover' | 'always';
} = {}) {
  let copyButtonStyle = /* css */ `

    pre:has(code) {
      --copy-icon: url("${copyIcon}");
      --success-icon: url("${successIcon}");
      position: relative;
    }

    button[data='<span>'] {
      width: 0;
      height: 0;
      display: none;
      visibility: hidden;
    }

    pre button.copy-code {
      top: 7px;
      right: 1px;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      margin-top: 2px;
      margin-right: 8px;
      position: absolute;
      border-radius: 25%;
      & span {
        width: 100%;
        aspect-ratio: 1 / 1;
      }
      & .ready {
        background-image: var(--copy-icon);
      }
      & .success {
        display: none; background-image: var(--success-icon);
      }
    }

    &.code-snipper-copied { 
      & .success { 
        display: block;
      } & .ready {
        display: none;
      }
    }

    pre button.copy-code.code-snipper-copied {
      opacity: 1;
      & .ready { display: none; }
      & .success { display: block; }
    }
`;
  if (visibility === 'hover') {
    copyButtonStyle += /* css */ `
        pre button.copy-code { opacity: 0; }
        figure[data-code-snipper-code-figure]:hover > pre > code button.copy-code {
          opacity: 1;
        }
      `;
  }
  return trimWhitespace(copyButtonStyle);
}