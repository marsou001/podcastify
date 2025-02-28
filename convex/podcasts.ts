import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getURL = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const createPodcast = mutation({
  args: {
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    voiceType: v.union(
      v.literal("alloy"), v.literal("shimmer"), v.literal("nova"), v.literal("echo"), v.literal("fable"), v.literal("onyx"), v.literal("ash"),v.literal("coral"),v.literal("sage")
    ),
    voicePrompt: v.string(),
    audioURL: v.string(),
    audioStorageId: v.id("_storage"),
    imagePrompt: v.optional(v.string()),
    imageURL: v.string(),
    imageStorageId: v.id("_storage"),
    views: v.number(),
    audioDuration: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError("Not authenticated!");
    }

    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), identity.email)).collect();

    if (user.length === 0) {
      throw new ConvexError("User not found!");
    }

    const podcast = await ctx.db.insert("podcasts", {
      ...args,
      user: user[0]._id,
      author: user[0].name,
      authorId: user[0].clerkId,
      authorImageURL: user[0].imageURL,
      audioDuration: 0,
    });

    return podcast;
  },
})

export const getTrendingPodcasts = query({
  handler: async (ctx) => {
    return await ctx.db.query("podcasts").collect();
  }
})

export const getPodcastById = query({
  args: { podcastId: v.id("podcasts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.podcastId);
  }
})