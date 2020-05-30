import { StoreonModule } from "storeon";
import { Tag } from "models/Tag";
import { api } from "api";

export interface TagsState {
  tags?: Tag[];
}

export interface TagsEvents {
  tagsCreate: Omit<Tag, "id">;
  tagsGet: undefined;
  tagsSave: Tag[];
  tagsAdd: Tag;
}

export const TagsModule: StoreonModule<TagsState, TagsEvents> = (store) => {
  store.on("@init", () => {
    store.dispatch("tagsGet");
  });

  store.on("tagsGet", async () => {
    const tags = await api.getTags();

    store.dispatch("tagsSave", tags);
  });

  store.on("tagsSave", (_state, tags) => ({
    tags,
  }));

  store.on("tagsCreate", async (_state, tagData) => {
    const tag = await api.createTag(tagData);

    store.dispatch("tagsAdd", tag);
  });

  store.on("tagsAdd", ({ tags }, tag) => ({
    tags: [...tags!, tag],
  }));
};
