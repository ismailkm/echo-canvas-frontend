import { Session, Version } from '@/types/sessions';

export function processSessionData(sessionData: Session): {
  session: Session;
  transformedVersions: Version[];
  initialSelectedVersion: Version;
} {
  const transformedVersions: Version[] = sessionData.versions.map(v => ({
    ...v,
    id: `v${v.version_number}`
  }));

  transformedVersions.sort(
    (a, b) => parseInt(b.id.substring(1)) - parseInt(a.id.substring(1))
  );

  const initialSelectedVersion = transformedVersions.find(
    (v) => parseInt(v.id.substring(1)) === sessionData.version_number
  );

  if (!initialSelectedVersion) {
    throw new Error("Initial selected version not found");
  }

  return { session: sessionData, transformedVersions, initialSelectedVersion };
}