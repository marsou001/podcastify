import { v } from "convex/values";
import { query } from "./_generated/server";

export const getURL = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});