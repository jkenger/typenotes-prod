export default function Error({ text }: { text: string }) {
  return <p className="text-sm text-red-500">{text}</p>;
}
