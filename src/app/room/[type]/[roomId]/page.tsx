import PokerRoom from "../../../../components/PokerRoom";
import RoleplayRoom from "../../../../components/RoleplayRoom";

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string; roomId: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { type, roomId } = await params;
  const { name } = await searchParams;

  if (type === "roleplay") {
    return <RoleplayRoom roomId={roomId} initialName={name ?? "플레이어"} />;
  }

  return <PokerRoom roomId={roomId} initialName={name ?? "플레이어"} />;
}