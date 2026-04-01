import RoleplayRoom from "@/components/RoleplayRoom";

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string; roomId: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { type, roomId } = await params;
  const { name } = await searchParams;

  if (type !== "roleplay") {
    return <div>잘못된 방 타입입니다.</div>;
  }

  return (
    <RoleplayRoom
      roomId={roomId}
      initialName={name?.trim() || "플레이어"}
    />
  );
}