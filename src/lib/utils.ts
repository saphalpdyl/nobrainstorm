import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Two parameters with 0 to 1 range, the more it is the greener it is and the less it is the redder it is, in hex.
export const getComplexityColor = (complexity: number, time: number) => {
  const complexityColor = Math.round(complexity * 255).toString(16).padStart(2, '0');
  const timeColor = Math.round(time * 255).toString(16).padStart(2, '0');
  return `#${timeColor}${complexityColor}00`;
}

export function cleanMarkdown(markdown: string, preserveBreaks: boolean = true): string {
  // Early exit for empty input
  if (!markdown) return ''
  
  // First handle code blocks to preserve their structure
  let result = markdown.replace(/```[\s\S]*?```/g, (match) => {
    const lines = match.split('\n')
    return lines.slice(1, -1).join(preserveBreaks ? '<br />' : ' ')
  })
  
  // Process the rest line by line
  const lines = result.split('\n')
  const processedLines = lines.map(line => {
    // Preserve empty lines if requested
    if (!line.trim()) {
      return preserveBreaks ? '<br />' : ' '
    }
    
    return line
      // Remove bold and italic
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove headers
      .replace(/^#{1,6}\s+(.+)$/, '$1')
      // Remove blockquotes
      .replace(/^\s*>\s+(.+)$/, '$1')
      // Remove inline code
      .replace(/`([^`]+)`/g, '$1')
      // Convert links
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      // Remove HTML (except br tags if preserving breaks)
      .replace(preserveBreaks ? /<(?!br\s*\/?>)[^>]+>/g : /<[^>]+>/g, '')
      // Convert list items
      .replace(/^\s*[-*+]\s+(.+)$/, '$1')
      .replace(/^\s*\d+\.\s+(.+)$/, '$1')
      // Remove horizontal rules
      .replace(/^\s*[-*_]{3,}\s*$/, '')
  })
  
  // Join with appropriate separator and trim only outer whitespace
  return processedLines.join(preserveBreaks ? '' : ' ').trim()
}


export function getTextBetweenTags(text: string, tagName: string): string {
  // Create the regex pattern for the specified tag name
  const pattern = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 's');
  
  // Extract the content
  const match = text.match(pattern);
  
  // Return the content if found, otherwise empty string
  return match ? match[1].trim() : '';
}

export function removeBrTags(text: string): string {
  return text.replace(/<br\s*\/?>/g, '\n');
}