import EditPodcast from "@/components/EditPodcast";
import { Id } from "@/convex/_generated/dataModel";

async function Page({ params }: { params: Promise<{ podcastId: Id<"podcasts"> }> }) {
  const { podcastId } = await params;
  
    return <EditPodcast podcastId={podcastId} />
}

export default Page;