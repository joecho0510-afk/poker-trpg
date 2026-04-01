import RoleplayRoom from "@/components/RoleplayRoom";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ type: string; roomId: string }>;
}) {
  const { type, roomId } = await params;

  if (type !== "roleplay") {
    return <div>잘못된 방 타입입니다.</div>;
  }

  return <RoleplayRoom roomId={roomId} initialName="플레이어" />;
}