import { ApiSchemaProfileData, TypeTemplateData, TypeTemplateTagData } from "../models";

class DataUtilFunctions {
  GetTagsFromTemplates(templates?: TypeTemplateData[]): TypeTemplateTagData[] {
    const _templates = Array.isArray(templates) ? templates : [];
    const hasAddedTagId: { [key: string]: boolean } = {};
    const tags: TypeTemplateTagData[] = [];
    const allTagsInTemplates = _templates
      .map(template => template.tags)
      .filter((tag): tag is TypeTemplateTagData[] => Array.isArray(tag));
    if (Array.isArray(allTagsInTemplates)) {
      allTagsInTemplates
        .flat()
        .forEach(t => {
          if (!hasAddedTagId[t.id]) {
            tags.push(t);
            hasAddedTagId[t.id] = true;
          }
        });
    }
    return tags;
  }

  GetRoleIsAdmin(profile: ApiSchemaProfileData): boolean {
    return profile.userRoles.some(r => r.role.name.toLowerCase() === 'admin');
  }

  GetRoleIsUser(profile: ApiSchemaProfileData): boolean {
    return profile.userRoles.some(r => r.role.name.toLowerCase() === 'user');
  }

  GetRoleIsCollaborator(profile: ApiSchemaProfileData): boolean {
    return profile.userRoles.some(r => r.role.name.toLowerCase() === 'collaborator');
  }
}

export const DataUtils = new DataUtilFunctions();