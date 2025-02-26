import { Id } from "@/convex/_generated/dataModel";

export function isStorageId(storageId: unknown): storageId is Id<"_storage"> {
  return typeof storageId === "string" && storageId.length === 32;
}