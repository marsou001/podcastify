import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  podcasts: defineTable({
    user: v.id("users"),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioURL: v.string(),
    audioStorageId: v.id("_storage"),
    imageURL: v.string(),
    imageStorageId: v.id("_storage"),
    author: v.string(),
    authorId: v.string(),
    authorImageURL: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.optional(v.string()),
    voiceType: v.union(
      v.literal("alloy"), v.literal("shimmer"), v.literal("nova"), v.literal("echo"), v.literal("fable"), v.literal("onyx"), v.literal("ash"),v.literal("coral"),v.literal("sage")
    ),
    audioDuration: v.number(),
    views: v.number(),
  })
  .searchIndex("search_author", { searchField: "author" })
  .searchIndex("search_title", { searchField: "podcastTitle" })
  .searchIndex("search_body", { searchField: "podcastDescription" }),
  users: defineTable({
    email: v.string(),
    imageURL: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
})