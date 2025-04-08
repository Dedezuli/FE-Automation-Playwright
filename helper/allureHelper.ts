import { allure } from 'allure-playwright';

type Severity = 'trivial' | 'minor' | 'normal' | 'critical' | 'blocker';

interface AllureMeta {
  feature?: string;
  severity?: Severity;
  owner?: string;
  epic?: string;
  story?: string;
}

export const setAllureMeta = (meta: AllureMeta) => {
  if (meta.feature) allure.label('feature', meta.feature);
  if (meta.severity) allure.severity(meta.severity);
  if (meta.owner) allure.owner(meta.owner);
  if (meta.epic) allure.label('epic', meta.epic);
  if (meta.story) allure.label('story', meta.story);
};
