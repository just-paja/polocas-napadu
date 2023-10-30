import ReactMarkdown from 'react-markdown'

import type { FC } from 'react'

interface MarkdownProps {
  source: string
}

export function Markdown({ source, ...props }: MarkdownProps) {
  return source ? <ReactMarkdown {...props}>{source}</ReactMarkdown> : null
}

interface ArrayListProps {
  text: string[]
}

export const ArrayList: FC<ArrayListProps> = ({ text }) => {
  if (!text || text.length === 0) {
    return null
  }
  return (
    <ul>
      {text.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}
