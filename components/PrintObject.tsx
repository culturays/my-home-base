 

export default function PrintObject({
  content,
}: {
  content: string;
}) {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
}