import { MoveRight } from "lucide-react";
export default function Button({ text }) {
  return (
    <button className="border-2 border-head-color px-5 py-2 flex items-center gap-2">
      {text}
      <MoveRight />
    </button>
  );
}
