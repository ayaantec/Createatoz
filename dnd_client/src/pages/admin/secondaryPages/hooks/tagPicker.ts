import React from 'react';
import { ApiHooks } from '../../../../core';
import { TypeTagData } from '../../../../models';

export function useTagPicker() {
  const [selectedTags, setSelectedTags] = React.useState<TypeTagData[]>([]);
  const { data: apiTags } = ApiHooks.Admin.Tag.GetAllTags.useHook();

  const addTag = React.useCallback(
    (tag: TypeTagData) => setSelectedTags(tags => [...tags, tag]), [],
  );
  const removeTag = React.useCallback(
    (tagId: string) => setSelectedTags(tags => tags.filter(t => t.id !== tagId)), [],
  );
  const toggleTagSelection = React.useCallback(
    (tagId: string) => setSelectedTags(tags => {
      if (tags.some(v => v.id === tagId)) {
        return tags.filter(t => t.id !== tagId);
      } else {
        const tagData = apiTags?.find(at => at.id === tagId);
        if (tagData !== undefined) {
          return [...tags, tagData];
        }
        return tags;
      }
    }),
    [apiTags],
  );
  const resetSelection = React.useCallback(
    () => setSelectedTags([]), [],
  );

  return {
    apiTags,
    selectedTags,
    addTag,
    removeTag,
    toggleTagSelection,
    resetSelection,
  };
}