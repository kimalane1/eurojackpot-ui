import { useDrawsQuery } from "../hooks/useDraws";

export default function DrawsPage() {
  const { data } = useDrawsQuery();
  return (
    <div>
      <h1>Eurojackpot Draws</h1>
    </div>
  );
}
