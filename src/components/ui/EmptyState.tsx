import Button from "./Button";

interface Props {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
      <div className="text-5xl">🔍</div>

      <h2 className="mt-4 text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

      {buttonText && (
        <Button
          className="mt-5"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}