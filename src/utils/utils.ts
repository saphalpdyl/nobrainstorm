export function cleanMarkdown(markdown: string): string {
  // Remove bold and italic markers
  let cleaned = markdown.replace(/(\*\*|__)(.*?)\1/g, '$2')  // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2')  // Italic
  
  // Remove headers while keeping the text
  cleaned = cleaned.replace(/^#{1,6}\s+(.+)$/gm, '$1')
  
  // Remove blockquotes
  cleaned = cleaned.replace(/^\s*>\s+(.+)$/gm, '$1')
  
  // Remove code blocks while keeping content
  cleaned = cleaned.replace(/```[\s\S]*?```/g, (match) => {
    return match.split('\n')
      .slice(1, -1)  // Remove first and last lines (```)
      .join('\n')
  })
  
  // Remove inline code
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1')
  
  // Convert links to just text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
  
  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, '')
  
  // Convert list items while keeping content
  cleaned = cleaned.replace(/^\s*[-*+]\s+(.+)$/gm, '$1')  // Unordered lists
    .replace(/^\s*\d+\.\s+(.+)$/gm, '$1')  // Ordered lists
  
  // Remove horizontal rules
  cleaned = cleaned.replace(/^\s*[-*_]{3,}\s*$/gm, '')
  
  // Remove empty lines that had markdown syntax
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n')
  
  return cleaned.trim()
}

export function getTextBetweenTags(text: string, tagName: string): string {
  // Create the regex pattern for the specified tag name
  const pattern = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 's');
  
  // Extract the content
  const match = text.match(pattern);
  
  // Return the content if found, otherwise empty string
  return match ? match[1].trim() : '';
}