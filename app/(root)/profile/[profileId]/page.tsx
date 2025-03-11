import ProfileDetails from "@/components/ProfileDetails";
import { Id } from "@/convex/_generated/dataModel";

async function Page({ params }: { params: { profileId: Id<"users"> }}) {
  const { profileId } = await params;

  return <ProfileDetails profileId={profileId} />
}

export default Page;