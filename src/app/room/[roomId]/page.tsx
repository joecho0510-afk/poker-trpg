import PokerRoom from "../../../components/PokerRoom";

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { roomId } = await params;
  const { name } = await searchParams;

  return <PokerRoom roomId={roomId} initialName={name ?? "플레이어"} />;
}